// import * as S from "./Message.style";
// import { useRecoilValue } from "recoil";
// import { IChatMessage } from "../../../types/chatType";

// const Message = ({ chatMessages }: { chatMessages: IChatMessage[] }) => {
//   return (
//     <S.ChatMessageLayout>
//       {chatMessages?.map((chatMessage: IChatMessage, i: number) =>
//         chatMessage.send_user?._id === user._id ? (
//           <S.Chatting flexdirection="row-reverse" key={i}>
//             <S.SendMessageInfoBox>
//               <S.SendMessageBox>
//                 <span>{chatMessage.message}</span>
//               </S.SendMessageBox>
//               <S.TimeBox textalign="right" right="100%" left="auto">
//                 <span>{chatMessage.send_date}</span>
//               </S.TimeBox>
//             </S.SendMessageInfoBox>
//           </S.Chatting>
//         ) : (
//           <S.Chatting flexdirection="row" key={"_msg" + i}>
//             <S.ChatContent>
//               <S.ProfileImgBox>
//                 <img src={`${chatMessage.send_user.image}`} alt={"사진"} />
//               </S.ProfileImgBox>
//               <S.MessageInfoBox>
//                 <S.NameBox>
//                   <span>{`${chatMessage.send_user.nickname}`}</span>
//                 </S.NameBox>
//                 <S.MessageBox>
//                   <p>{chatMessage.message}</p>
//                 </S.MessageBox>
//                 <S.TimeBox textalign="left" left="100%" right="">
//                   <span>{chatMessage.send_date}</span>
//                 </S.TimeBox>
//               </S.MessageInfoBox>
//             </S.ChatContent>
//           </S.Chatting>
//         )
//       )}
//     </S.ChatMessageLayout>
//   );
// };

// export default Message;
import React from "react";

const Message = () => {
  return <div>Message</div>;
};

export default Message;
