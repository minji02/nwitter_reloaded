import styled from "styled-components";
import { ModalWrapper, CloseBtn } from "./modal";
import { Avatar } from "../routes/profile";
import React from "react";
import { auth, db } from "../firebase";
import { updateProfile } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";

const Form = styled.form`
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  &.button {
    border: 0;
    background-color: #001a4d;
    color: white;
    border-radius: 20px;
    width: 60px;
    height: 35px;
    font-weight: 600;
  }
  width: 250px;
`;

export default function EditAvatar({
  setEditing,
  setEditName,
  editName,
}: Avatar) {
  const onClick = () => setEditing(false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditName(e.target.value);
  };
  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || editName === "") return;
    try {
      if (user?.displayName === editName) {
        alert("현재 이름과 동일합니다. 다른 이름을 사용해주세요.");
      }
      confirm("Are you sure change your name?");
      await updateProfile(user, { displayName: editName });
      const tweetQuery = query(
        collection(db, "tweets"),
        where("userId", "==", user?.uid)
      );
      const snapshot = await getDocs(tweetQuery);

      const batch = writeBatch(db);

      snapshot.forEach((doc) => {
        batch.update(doc.ref, { username: editName });
      });
      await batch.commit();
    } catch (e) {
      console.log(e);
    } finally {
      setEditing(false);
    }
  };
  return (
    <ModalWrapper className="edit_avatar">
      <CloseBtn onClick={onClick}>
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
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </CloseBtn>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          className="name"
          name="name"
          type="text"
          placeholder="Write your new name"
        />
        <Input className="button" type="submit" value="save" />
      </Form>
    </ModalWrapper>
  );
}
