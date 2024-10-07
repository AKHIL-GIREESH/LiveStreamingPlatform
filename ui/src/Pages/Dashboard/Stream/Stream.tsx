//import { useUser } from "@/AuthProvider"
import { useUser } from "@/AuthProvider"
import StreamPlayer from "@/components/streamplayer/streamPlayer"
import { useGetStream } from "@/StreamContext"

const Stream = () => {
    const user = useUser()
    const stream = useGetStream()
    console.log(stream)

    if(stream === null || user === null){
        return(<>Something went wrong</>)
    }
    return(
        <> 
            {stream.name}
            Streamplayer with user,stream and following as props 
            <StreamPlayer id={user._id} hostname={user.username} hostid={user._id}/> 
        </>
    )
}

export default Stream

// import { useEffect, useState } from 'react';
// import { Room,connect } from 'livekit-client';

// interface ViewerProps {
//   token: string;
//   roomName: string;
// }

// const Stream: React.FC<ViewerProps> = ({ token, roomName }) => {
//   const [room, setRoom] = useState<Room | null>(null);

//   useEffect(() => {
//     const connectToRoom = async () => {
//       const room = await connect(token, {
//         // Automatically subscribe to tracks when joining
//       });
//       setRoom(room);

//       room.on('trackSubscribed', (track, publication, participant) => {
//         if (track.kind === 'video') {
//           const videoElement = document.getElementById('video-element');
//           track.attach(videoElement); // Attach the video stream to the video element
//         }
//       });
//     };

//     connectToRoom();

//     return () => {
//       room?.disconnect(); // Clean up when the component unmounts
//     };
//   }, [token, roomName]);

//   return (
//     <div>
//       <h1>Live Stream Viewer</h1>
//       <video id="video-element" autoPlay controls playsInline style={{ width: '100%' }}></video>
//     </div>
//   );
// };

// export default Stream