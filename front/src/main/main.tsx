import axios from 'axios';
import { useEffect } from 'react';
import './main.css';

export const Main = () => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="mainContainer">
      <div className="header">
        <select className="selectBox">
          <option value="">검색 기준</option>
          <option value="title">글제목</option>
          <option value="user">작성자</option>
        </select>
        <form>
          <input type="text" className="searchBox"></input>
          <button className="searchBtn">검색</button>
        </form>
      </div>
      <div className="contents">
        {arr.map((arr) => {
          if (arr % 2) return <div className="boardW"></div>;
          else return <div className="boardG"></div>;
        })}
      </div>
    </div>
  );
};
