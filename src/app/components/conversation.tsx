"use client";

import { useConversation } from "@11labs/react";
import { useCallback } from "react";

export function Conversation() {
  const conversation = useConversation({
    onConnect: () => console.log("Connected"),
    onDisconnect: () => console.log("Disconnected"),
    onMessage: (message) => console.log("Message:", message),
    onError: (error) => console.error("Error:", error),
  });

  const startConversation = useCallback(async () => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Start the conversation with your agent
      await conversation.startSession({
        agentId: "agent_01jvwkfaf3fdttfwyk7247eszh", // Replace with your agent ID
      });
    } catch (error) {
      console.error("Failed to start conversation:", error);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  return (
    <div className="flex flex-col items-center gap-8 h-100 bg-gray-900 justify-center p-8">
      
      {/* Animated Button Container */}
      <div className="relative">
        {/* Waving Aura - Only when connected */}
        {conversation.status === "connected" && (
          <div className="absolute inset-0">
            {/* Outer Ring - Speaking Animation (outward waves) */}
            {conversation.isSpeaking && (
              <>
                <div className="absolute inset-0 rounded-full border-2 border-red-400/40 animate-ping" style={{
                  width: '240px',
                  height: '240px',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  animationDuration: '1.5s'
                }}></div>
                
                <div className="absolute inset-0 rounded-full border-2 border-red-400/60" style={{
                  width: '200px',
                  height: '200px',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: 'ping 1.2s cubic-bezier(0, 0, 0.2, 1) infinite',
                  animationDelay: '0.2s'
                }}></div>
                
                <div className="absolute inset-0 rounded-full border-2 border-red-400/80" style={{
                  width: '160px',
                  height: '160px',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
                  animationDelay: '0.4s'
                }}></div>
              </>
            )}

            {/* Listening Animation (inward pulse) */}
            {!conversation.isSpeaking && (
              <>
                <div className="absolute inset-0 rounded-full border-2 border-green-400/60" style={{
                  width: '160px',
                  height: '160px',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: 'reverse-pulse 2s ease-in-out infinite'
                }}></div>
                
                <div className="absolute inset-0 rounded-full border-2 border-green-400/40" style={{
                  width: '200px',
                  height: '200px',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: 'reverse-pulse 2s ease-in-out infinite',
                  animationDelay: '0.3s'
                }}></div>
                
                <div className="absolute inset-0 rounded-full border-2 border-green-400/20" style={{
                  width: '240px',
                  height: '240px',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: 'reverse-pulse 2s ease-in-out infinite',
                  animationDelay: '0.6s'
                }}></div>
              </>
            )}
          </div>
        )}

        {/* Glow Effect - Only when connected */}
        {conversation.status === "connected" && (
          <div className={`absolute inset-0 rounded-full blur-xl animate-pulse ${
            conversation.isSpeaking 
              ? 'bg-red-500/30' 
              : 'bg-green-500/30'
          }`} style={{
            width: '140px',
            height: '140px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            animationDuration: conversation.isSpeaking ? '1s' : '2s'
          }}></div>
        )}

        {/* Main Button */}
        <button
          onClick={
            conversation.status === "connected"
              ? stopConversation
              : startConversation
          }
          className={`relative z-10 w-32 h-32 rounded-full text-white font-semibold transition-all duration-300 shadow-2xl hover:scale-105 ${
            conversation.status === "connected" 
              ? (conversation.isSpeaking 
                  ? "bg-gradient-to-br from-red-500 to-red-600 shadow-red-500/50" 
                  : "bg-gradient-to-br from-green-500 to-green-600 shadow-green-500/50")
              : conversation.status === "connecting"
              ? "bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-yellow-500/50"
              : "bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-500/50"
          }`}
        >
          <div className="flex flex-col items-center justify-center">
            {conversation.status === 'connecting' ? (
              <>
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mb-1"></div>
                <span className="text-xs">Connecting...</span>
              </>
            ) : (
              <>
                <div className={`w-8 h-8 mb-1 ${
                  conversation.status === 'connected' && conversation.isSpeaking ? 'animate-pulse' : ''
                }`}>
                  {conversation.status === "connected" ? (
                    // Phone off icon
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      <line x1="23" y1="1" x2="1" y2="23" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  ) : (
                    // Phone on icon
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                    </svg>
                  )}
                </div>
                <span className="text-xs leading-tight">
                  {conversation.status === "connected" ? "End Call" : "Start Call"}
                </span>
              </>
            )}
          </div>
        </button>
      </div>

      {/* Status Display */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${
            conversation.status === 'connected' ? 'bg-green-400 animate-pulse' :
            conversation.status === 'connecting' ? 'bg-yellow-400 animate-pulse' :
            'bg-gray-400'
          }`}></div>
          <p className="text-white font-medium">
            Status: <span className="capitalize">{conversation.status}</span>
          </p>
        </div>
        
        {conversation.status === 'connected' && (
          <p className={`text-sm font-medium ${
            conversation.isSpeaking ? 'text-red-400' : 'text-green-400'
          }`}>
            Agent is {conversation.isSpeaking ? "speaking" : "listening"}
          </p>
        )}
      </div>

      {/* Custom CSS for reverse pulse animation */}
      <style jsx>{`
        @keyframes reverse-pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0.4;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}