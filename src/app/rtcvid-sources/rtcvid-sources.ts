import { Component, ElementRef, ViewChild } from '@angular/core';

type MsgStruct = {
  isSelf: boolean;
  msg: string;
  timesent: number;
};
@Component({
  selector: 'app-rtcvid-sources',
  imports: [],
  templateUrl: './rtcvid-sources.html',
  styleUrl: './rtcvid-sources.css',
})
export class RTCVidSources {
  localConnection = new RTCPeerConnection();
  remoteConnection: RTCPeerConnection | null = null;
  sendChannel: RTCDataChannel | null = null;
  messages: MsgStruct[] = [];
  initRemote() {
    this.remoteConnection = new RTCPeerConnection();
    this.remoteConnection.ondatachannel = this.recieveChannelCallback;
    this.remoteConnection.onicecandidate = (e) =>
      !e.candidate ||
      this.localConnection.addIceCandidate(e.candidate).catch((e) => {
        console.error(e);
      });

    return this.remoteConnection;
  }

  permissions = false;
  @ViewChild('inputstream') inputVideoElRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  constraints = {
    audio: false,
    video: true,
  };
  async updatePerms() {
    const perm = await navigator.mediaDevices.getDisplayMedia(this.constraints);
    if (perm) {
      this.permissions = true;
      const vidTracks = perm.getVideoTracks();
      vidTracks.forEach((track) => {
        console.log(track.label);
      });
      this.inputVideoElRef.nativeElement.srcObject = perm;
      this.canvasRef.nativeElement.width = 1280;
      this.canvasRef.nativeElement.height = 720;

      requestAnimationFrame(this.render.bind(this));
    }
  }

  render() {
    const ctx = this.canvasRef.nativeElement.getContext('2d')!;

    ctx.drawImage(
      this.inputVideoElRef.nativeElement,
      0,
      0,
      this.canvasRef.nativeElement.width,
      this.canvasRef.nativeElement.height,
    );
    ctx.fillStyle = 'red';
    ctx.fillRect(20, 20, 400, 400);
    requestAnimationFrame(this.render.bind(this));
  }

  recieveChannelCallback = (e: RTCDataChannelEvent) => {
    const receiveChannel = e.channel;

    // console.log('Remote channel received');

    receiveChannel.onopen = () => {
      console.log('Remote channel opened');
    };

    receiveChannel.onmessage = (e: MessageEvent) => {
      console.log('received:', e.data);

      this.messages.push({
        isSelf: false,
        msg: e.data,
        timesent: performance.now(),
      });
      // console.log(this.messages);
    };

    receiveChannel.onerror = (e) => {
      console.error('Receive channel error:', e);
    };
  };

  handleReceiveMessage(e: MessageEvent) {
    console.log('recieved', e.data);
  }
  message = '';
  setMessage(e: Event) {
    // @ts-ignore
    this.message = e.target.value;
  }
  sendMessage() {
    this.messages.push({
      isSelf: true,
      msg: this.message,
      timesent: performance.now(),
    });
    this.sendChannel?.send(this.message);
  }

  handleSendChannelStatusChange(e: Event) {
    console.log('send channel status changed: ', e);
  }
  connected = false;
  async connectPeers() {
    if (this.connected) {
      console.log('Clients connected already');
      return;
    }
    this.sendChannel = this.localConnection.createDataChannel('sendChannel');
    this.sendChannel.onopen = (e) => this.handleSendChannelStatusChange(e);
    this.sendChannel.onclose = (e) => this.handleSendChannelStatusChange(e);

    this.localConnection.onicecandidate = (e) =>
      !e.candidate ||
      this.remoteConnection?.addIceCandidate(e.candidate).catch((e) => {
        console.error(e);
      });
    const remoteConnection = this.initRemote();
    try {
      const offer = await this.localConnection.createOffer();
      console.log('offer:', offer);
      await this.localConnection.setLocalDescription(offer);
      await remoteConnection.setRemoteDescription(this.localConnection.localDescription!);

      const answer = await remoteConnection.createAnswer();
      console.log('answer:', answer);
      await remoteConnection.setLocalDescription(answer);
      await this.localConnection.setRemoteDescription(remoteConnection.localDescription!);
      console.log('connected peers');
      this.connected = true;
    } catch (error) {
      console.error(error);
    }
  }
}
