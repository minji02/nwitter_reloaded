import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
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
  border-bottom: 1px solid #c5c5c565;
`;

const Column = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
`;

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

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const ButtonWarpper = styled.div``;

const Button = styled.button`
  color: #001a4d67;
  background-color: transparent;
  border: 0;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
  svg {
    width: 20px;
  }
  &:hover {
    color: #001a4db8;
  }
`;

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
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
        <Username>{username}</Username>
        <ButtonWarpper>
          {!isEditing && user?.uid === userId ? (
            <>
              <Button onClick={onEdit}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </Button>
              <Button onClick={onDelete}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </Button>
            </>
          ) : null}
        </ButtonWarpper>
      </Column>
      {isEditing ? (
        <EditTweetForm tweet={tweet} id={id} setEditing={setEditing} />
      ) : (
        <Payload>{tweet}</Payload>
      )}
      <PhtoColumn>{photo ? <Photo src={photo} /> : null} </PhtoColumn>
    </Wrapper>
  );
}
