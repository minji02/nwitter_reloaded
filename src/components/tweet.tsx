import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import EditTweetForm from "./edit-tweet-form";

export interface ReTweet {
  tweet: string;
  id: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-bottom: 1px solid #c5c5c575;
`;

const Column = styled.div``;

const PhtoColumn = styled.div`
  justify-self: center;
`;

const Photo = styled.img`
  height: 100%;
  width: 100%;

  border: 1px solid #979797;
  border-radius: 10px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Useremail = styled.span`
  font-weight: 500;
  font-size: 13px;
  color: #5b5b5b;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const EditButton = styled.button``;

export default function Tweet({
  username,
  photo,
  tweet,
  userId,
  id,
  email,
}: ITweet) {
  const user = auth.currentUser;
  const [isEditing, setEditing] = useState(false);

  const onDelete = async () => {
    const ok = confirm("Are you sure you want to delete this tweet?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`); //사진을 저장할 떄와 같은 경로
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onEdit = async () => {
    if (user?.uid !== userId) return;
    try {
      setEditing(true);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username> <Useremail>{email}</Useremail>
        {isEditing ? (
          <EditTweetForm tweet={tweet} id={id} setEditing={setEditing} />
        ) : (
          <Payload>{tweet}</Payload>
        )}
      </Column>{" "}
      <PhtoColumn>{photo ? <Photo src={photo} /> : null} </PhtoColumn>
      {!isEditing && user?.uid === userId ? (
        <>
          <DeleteButton onClick={onDelete}>Delete</DeleteButton>
          <EditButton onClick={onEdit}>Edit</EditButton>
        </>
      ) : null}
    </Wrapper>
  );
}
