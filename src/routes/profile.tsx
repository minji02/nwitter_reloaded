import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { SetStateAction, useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { ITweet } from "../components/timeline";
import Tweet from "../components/tweet";
import EditAvatar from "../components/edit-avatar";

export interface Avatar {
  setEditName: React.Dispatch<SetStateAction<string>>;
  setEditing: React.Dispatch<SetStateAction<boolean>>;
  editName: string;
}

const Wrapper = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
  gap: 10px;
  &.blur::after {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;

const AvatarWrapper = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border-bottom: 1px solid #c5c5c547;
  width: 100%;
`;

const AvatarUpload = styled.label`
  width: 80px;
  overflow: hidden;
  height: 80px;
  border-radius: 50%;
  background-color: #1d9bf0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 50px;
  }
`;
const AvatarImg = styled.img`
  width: 100%;
`;
const AvatarInput = styled.input`
  display: none;
`;
const Name = styled.span`
  font-size: 22px;
  font-weight: 600;
  display: flex;
  width: 100%;
  align-items: center;
  svg {
    width: 20px;
  }
`;

const Email = styled.span`
  font-size: 16px;
`;

const Tweets = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;

export default function Profile() {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [isHovering, setHovering] = useState(false);
  const [editName, setEditName] = useState("");
  const [isEditing, setEditing] = useState(false);

  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!user) return;
    if (files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage, `avatars/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref);
      setAvatar(avatarUrl);
      await updateProfile(user, {
        photoURL: avatarUrl,
      });
    }
  };

  const handleMouseOver = () => {
    setHovering(true);
  };
  const handleMouseOut = () => {
    setHovering(false);
  };

  const EditName = () => {
    if (!user) return;
    if (user?.displayName) {
      setEditName(user?.displayName);
    }
    setEditing(true);
  };

  const fetchTweets = async () => {
    const tweetQuery = query(
      collection(db, "tweets"),
      where("userId", "==", user?.uid),
      orderBy("createAt", "desc"),
      limit(25)
    );
    const snapshot = await getDocs(tweetQuery);
    const tweets = snapshot.docs.map((doc) => {
      const { tweet, createAt, userId, username, photo, email } = doc.data();
      return {
        tweet,
        createAt,
        userId,
        username,
        photo,
        email,
        id: doc.id,
      };
    });
    setTweets(tweets);
  };
  useEffect(() => {
    fetchTweets();
  }, []);
  return (
    <Wrapper className={isEditing ? "blur" : ""}>
      <AvatarWrapper>
        <AvatarUpload htmlFor="avatar">
          {avatar ? (
            <AvatarImg src={avatar} />
          ) : (
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
            </svg>
          )}
        </AvatarUpload>
        <AvatarInput
          onChange={onAvatarChange}
          id="avatar"
          type="file"
          accept="image/*"
        />
        <Name
          onClick={EditName}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          {user?.displayName ?? "Anonymous"}{" "}
          {isHovering ? (
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
          ) : null}
        </Name>
        <Email>{user?.email}</Email>
      </AvatarWrapper>
      {isEditing ? (
        <EditAvatar
          setEditName={setEditName}
          editName={editName}
          setEditing={setEditing}
        />
      ) : null}
      <Tweets>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </Tweets>
    </Wrapper>
  );
}
