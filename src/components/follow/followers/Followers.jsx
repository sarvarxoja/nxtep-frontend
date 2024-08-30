import "../follow.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { MainTitle } from "../../title/MainTitle";
import { UsersFollow } from "../users/FollowUsers";
import { useDispatch, useSelector } from "react-redux";
import { fetchFollow } from "../follow_actions/FollowActions";

export const FollowersComponent = () => {
  const dispatch = useDispatch();
  let { username } = useParams();
  const { follow, user, loading, error } = useSelector(
    (state) => state.followData
  );

  useEffect(() => {
    dispatch(fetchFollow(username, "followers"));
  }, [dispatch]);

  return (
    <div className="body_controller">
      <MainTitle title={user.name} />
      <UsersFollow follow={follow} />
    </div>
  );
};
