import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { toast } from 'react-toastify';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useContext(AuthContext);

  // Load notifications from localStorage on mount
  useEffect(() => {
    if (user?.email) {
      const savedNotifications = localStorage.getItem(`notifications_${user.email}`);
      if (savedNotifications) {
        const parsed = JSON.parse(savedNotifications);
        setNotifications(parsed);
        setUnreadCount(parsed.filter(n => !n.read).length);
      }
    }
  }, [user?.email]);

  // Save notifications to localStorage whenever notifications change
  useEffect(() => {
    if (user?.email && notifications.length > 0) {
      localStorage.setItem(`notifications_${user.email}`, JSON.stringify(notifications));
    }
  }, [notifications, user?.email]);

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now().toString(),
      ...notification,
      timestamp: new Date(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);

    // Show toast notification
    toast.info(notification.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const deleteNotification = (notificationId) => {
    const notification = notifications.find(n => n.id === notificationId);
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  // Simulate real-time notifications (in a real app, this would be WebSocket or Server-Sent Events)
  useEffect(() => {
    if (!user?.email) return;

    // Simulate booking confirmation notification
    const simulateBookingNotification = () => {
      const messages = [
        "Your booking has been confirmed! 🎉",
        "New tutor available in your preferred language! 🌟",
        "Don't forget about your upcoming session! ⏰",
        "Your review has been published! 📝",
        "Welcome to Language Exchange! 🚀"
      ];
      
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      
      addNotification({
        type: 'info',
        title: 'System Update',
        message: randomMessage,
        action: 'view'
      });
    };

    // Simulate notifications every 30 seconds (for demo purposes)
    const interval = setInterval(simulateBookingNotification, 30000);
    
    return () => clearInterval(interval);
  }, [user?.email]);

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
