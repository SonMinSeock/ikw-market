import React from "react";
import styled from "styled-components";
import { CgProfile } from "react-icons/cg";
import Text from "../../../components/common/atoms/Text";
import { IProduct } from "../../../types/productType";

const UserInfoLayout = styled.div`
  text-decoration: none;
  display: flex;
  margin-top: 25px;
  padding-bottom: 23px;
  position: relative;
  border-bottom: 1px solid #e9ecef;
  align-items: center;
  width: 673px;
  margin: 20px auto;
  & svg {
    margin-right: 0.5rem;
  }
`;
const UserInfo = ({ user }: { user: IProduct["seller_info"] }) => {
  return (
    <UserInfoLayout>
      <CgProfile size={28} />
      <Text>{user.nickname}</Text>
    </UserInfoLayout>
  );
};

export default UserInfo;
