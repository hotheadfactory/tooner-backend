import React from 'react';
import './SideMenu.css'
import '../Main.css'

function GoReview() {
    return (
      <div className="go_review">
        <button id="review">
          <img id="review__icon" src="/icon/write.png" alt="" />
          &nbsp;리뷰 쓰러가기
        </button>
      </div>
    );
  }
  
  function Category(props) {
    return (
      <div className="category">
        <ul className="category__toppost">
          <li>추천 리뷰</li>
          <li>인기글</li>
        </ul>
        <ul className="category__review">
          <li>한줄 리뷰</li>
          <li>상세 리뷰</li>
        </ul>
        <ul className="category__board">
          <li>자유 게시판</li>
          <li>질문 게시판</li>
          <li>영업 게시판</li>
          <li>찾아주세요</li>
        </ul>
      </div>
    );
  }


  function SideMenu(props) {
      return (
        <div className="review__category inline">
            <GoReview />
            <Category />
        </div>
      );
  }

  export default SideMenu;