import { addDoc, collection, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 2fr 1fr;
  gap: 10px;
  padding: 10px 30px;
  border-bottom: 1px solid #c5c5c575;
`;

const TextArea = styled.textarea`
  grid-column-start: 1;
  grid-column-end: 3;
  border: none;
  padding: 10px;
  font-size: 16px;
  color: black;
  background-color: white;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
  }
  border-bottom: 1px solid #c5c5c565;
`;

const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #001a4d;
  text-align: center;
  border-radius: 20px;
  cursor: pointer;
  width: 50px;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.input`
  width: 35%;
  height: 85%;
  font-weight: 600;
  font-size: 14px;
  background-color: #001a4d;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
  justify-self: end;
`;

const ImageBtn = styled.img`
  height: 20px;
`;

export default function PostTweetForm() {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };
  //타입이 file인 input이 변경될 때마다 파일의 배열을 받게 될 것임.
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target; //target에서 file 추출
    if (files && files.length === 1) {
      //file이 하나인지 확인 여러 파일이 올라가지 않게 하기 위함
      if (files[0].size > 1024 * 1024) {
        alert("1MB 이하의 사진만 업로드 가능합니다.");
        return;
      }
      setFile(files[0]); //file이 저장되어 있는 file 배열의 첫 번째 항목
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || tweet === "" || tweet.length > 300) return;
    try {
      setLoading(true);

      const doc = await addDoc(collection(db, "tweets"), {
        tweet,
        email: user.email,
        createAt: Date.now(),
        username: user.displayName || "Annoymous",
        userId: user.uid,
      });
      if (file) {
        const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        updateDoc(doc, {
          photo: url,
        });
      }
      setTweet("");
      setFile(null);
      console.log("Posted");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <TextArea
        maxLength={300}
        onChange={onChange}
        value={tweet}
        placeholder="What is happening?"
      />
      <AttachFileButton htmlFor="file">
        <ImageBtn src="/img-btn.svg" />
      </AttachFileButton>
      <AttachFileInput
        onChange={onFileChange}
        type="file"
        id="file"
        accept="image/*"
      />
      <SubmitBtn type="submit" value={isLoading ? "Posting..." : "Post"} />
    </Form>
  );
}
