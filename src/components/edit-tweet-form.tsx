import styled from "styled-components";
import { ReTweet } from "./tweet";
import { useState } from "react";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const Form = styled.form``;
const Textarea = styled.textarea`
  resize: none;
`;
const EditFileBtn = styled.input``;

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
  return (
    <Form onSubmit={onSubmit}>
      <Textarea
        rows={5}
        maxLength={300}
        onChange={onChange}
        value={editTweet}
      />
      <EditFileBtn type="submit" value="done" />
    </Form>
  );
}
