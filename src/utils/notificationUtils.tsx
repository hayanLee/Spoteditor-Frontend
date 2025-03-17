import React from 'react';

// 알림 문자열을 받아서 동적 부분(유저 이름, 게시물 제목)에 font-semibold를 적용하는 함수
 export const formatNotificationJSX = (notification: string): React.ReactNode[] => {
  // 게시물 업데이트 알림: "게시물을" 키워드가 포함된 경우
  if (notification.includes("게시물을")) {
    const match = notification.match(/^(.*?)님이\s+(.*?)\s게시물을/);
    if (match) {
      const username = match[1];
      const postTitle = match[2];
      // 매칭된 부분의 길이 이후의 텍스트
      const endIndex = match[0].length;
      const restText = notification.substring(endIndex);
      return [
        <span className='font-semibold' key="username">{username}</span>,
        "님이 ",
        <span className='font-semibold' key="postTitle">{postTitle}</span>,
        " 게시물을",
        restText
      ];
    }
  } else {
    // 단순 팔로우 알림: "게시물을" 키워드가 없는 경우
    const match = notification.match(/^(.*?)님이/);
    if (match) {
      const username = match[1];
      const endIndex = match[0].length;
      const restText = notification.substring(endIndex);
      return [
        <span className='font-semibold' key="username">{username}</span>,
        "님이 ",
        restText
      ];
    }
  }
  // 패턴 매칭이 실패하면 전체 문자열을 그대로 반환
  return [notification];
}