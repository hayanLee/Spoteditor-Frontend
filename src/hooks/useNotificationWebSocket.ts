import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { notificationStore } from "@/store/notificationStore";
import { Notification } from "@/services/apis/types/notificationAPI";

// 백엔드 웹소켓 엔드포인트 확인 필요
const SOCKET_URL = "https://localhost:8080/ws-endpoint"; // 백엔드 웹소켓 주소(SockJS는 ws://가 아닌 http:// 사용)
const SUBSCRIBE_URL = "/topic"; // 백엔드가 알림을 보내는 경로

export function useNotificationWebSocket() {
  const { addNotification } = notificationStore();
  const [stompClient, setStompClient] = useState<Client | null>(null);

  useEffect(() => {
    if (stompClient) {
      console.log("기존 STOMP 클라이언트가 이미 활성화됨. 재연결 방지");
      return;
    }
    console.log("웹소켓 클라이언트 초기화 중...");

    const client = new Client({
      webSocketFactory: () => new SockJS(SOCKET_URL),
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("웹소켓 연결 성공");

        client.subscribe(SUBSCRIBE_URL, (message) => {
          const newNotification: Notification = JSON.parse(message.body);
          addNotification(newNotification);
        });
      },
      onStompError: (frame) => {
        console.error("STOMP 에러 발생:", frame);
      },
      onDisconnect: () => {
        console.warn("STOMP 연결이 끊어졌습니다.");
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      console.log("웹소켓 클라이언트 비활성화");
      client.deactivate(); // 안전하게 연결 해제
    };
  }, []);

  return { stompClient };
}










/* import { useQueryClient } from '@tanstack/react-query';
import { notificationKeys } from './queries/notification/notificationQueryKeys';
import useWebSocket from 'react-use-websocket';
import { notificationStore } from '@/store/notificationStore';

export default function useNotificationWebSocket() {
  const queryClient = useQueryClient();
  const addNotification = notificationStore((state) => state.addNotification);

  return useWebSocket(`wss://localhost:8080/ws-endpoint`, {
    shouldReconnect: () => true, // 연결이 끊어지면 자동 재연결
    onMessage: (event) => {
      console.log('Received message:', event.data);
      const newNotification = JSON.parse(event.data);

      addNotification(newNotification); // 알림 리스트에 추가
      queryClient.invalidateQueries({ queryKey: notificationKeys.all }); // 새로운 알림이 오면 쿼리 갱신
    },
  });
} */

//클라이언트는 /app/{메시지_핸들러} 경로로 메시지를 보내야 서버에서 처리 가능

/* export default function useNotificationWebSocket() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const queryClient
 = useQueryClient();
  const [unreadCount, setUnreadCount] = useState(0);

  useWebSocket(`wss://${BASE_URL}/ws-endpoint`, {
    shouldReconnect: () => true, // 연결이 끊어지면 자동 재연결
    onMessage: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all }); // 새로운 알림이 오면 쿼리 갱신
      setUnreadCount((prev) => prev + 1); // 읽지 않은 알림 개수 증가
    },
  });
  const resetUnreadCount = () => setUnreadCount(0); // 알림창을 열면 개수 초기화
  return { unreadCount, resetUnreadCount };
} */
