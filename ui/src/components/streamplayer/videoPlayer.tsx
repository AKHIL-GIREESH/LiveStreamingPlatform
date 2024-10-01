import { ConnectionState, Track } from "livekit-client";
import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from "@livekit/components-react";
import { LiveVideo } from "./liveVideo";

const Video = ({hostName,hostIdentity}:{hostName:string,hostIdentity:string}) => {
    const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === hostIdentity);

  let content;

  if (!participant && connectionState === ConnectionState.Connected) {
    content = <p>Host offline</p>;
  } else if (!participant || tracks.length === 0) {
    content = <p>Loading</p>;
  } else {
    content = <LiveVideo participant={participant}/>;
  }
    return(<>VIdeo
    {content}</>)
}

export default Video