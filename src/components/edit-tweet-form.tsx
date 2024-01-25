import styled from "styled-components";
import { ReTweet } from "./tweet";
import { useState } from "react";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: end;
  margin-top: 10px;
  gap: 10px;
`;
const Textarea = styled.textarea`
  resize: none;
  width: 100%;
`;

const Button = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const EditFileBtn = styled.input`
  border: 0;
  background-color: white;
  color: #5b5b5b;
  border: 1px solid #5b5b5b;
  border-radius: 20px;
  font-size: 15px;
  width: 60px;
  height: 27px;
  cursor: pointer;
  &:hover {
    border: 2px solid #001a4d;
    font-weight: 600;
    color: #001a4d;
  }
`;

const CancelBtn = styled.button`
  border: 0;
  background-color: white;
  color: #5b5b5b;
  border: 1px solid #5b5b5b;
  border-radius: 20px;
  font-size: 15px;
  width: 60px;
  height: 27px;
  cursor: pointer;
  &:hover {
    border: 2px solid #001a4d;
    font-weight: 600;
    color: #001a4d;
  }
`;

export default function EditTweetForm({ tweet, id, setEditing }: ReTweet) {
  const [isLoading, setLoading] = useState(false);
  const [editTweet, setEditTweet] = useState(tweet);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditTweet(e.target.value);
  };
  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || editTweet === "" || editTweet.length > 300)
      return;
    try {
      setLoading(true);
      await updateDoc(doc(db, "tweets", id), { tweet: editTweet });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      setEditing(false);
    }
  };

  const OnClick = () => {
    setEditing(false);
  };
  return (
    <Form onSubmit={onSubmit}>
      <Textarea
        rows={5}
        maxLength={300}
        onChange={onChange}
        value={editTweet}
      />
      <Button>
        <EditFileBtn type="submit" value="done" />
        <CancelBtn onClick={OnClick}>cancel</CancelBtn>
      </Button>
    </Form>
  );
}
