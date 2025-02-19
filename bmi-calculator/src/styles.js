import styled from "styled-components";

export const Container = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const Title = styled.h2`
  color: #333;
`;

export const Input = styled.input`
  width: 80%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Button = styled.button`
  background: #007BFF;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  width: 100%;
  border-radius: 5px;
  &:hover {
    background: #0056b3;
  }
`;

export const Result = styled.div`
  margin-top: 15px;
  font-size: 18px;
`;
