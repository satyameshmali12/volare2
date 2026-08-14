"use client";

import { useEffect, useState } from "react";
import { Mail, Trash2, Check, Loader2, Circle } from "lucide-react";

import DeleteConfirmation from "../../../components/admin/DeleteConfirmation";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState([]);

  const [loading, setLoading] = useState(true);
  const [markingRead, setMarkingRead] = useState(false);

  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch messages
  const fetchMessages = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/messages");

      if (!res.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await res.json();

      setMessages(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Select / unselect one message
  const toggleMessage = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // Select all
  const toggleAll = () => {
    if (selected.length === messages.length) {
      setSelected([]);
    } else {
      setSelected(messages.map((message) => message._id));
    }
  };

  // Mark selected messages as read
  const markAsRead = async () => {
    if (selected.length === 0) return;

    try {
      setMarkingRead(true);

      const res = await fetch("/api/admin/messages/read", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ids: selected,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to mark as read");
      }

      // this code is to set the messages to read once confirmed and also sorting them again moving the non-readed above of the readed
      // one
      setMessages((prev) => {
        const updated = prev.map((message) =>
          selected.includes(message._id) ? { ...message, read: true } : message,
        );

        return updated.sort((a, b) => {
          if (a.read !== b.read) {
            return Number(a.read) - Number(b.read);
          }

          return new Date(b.createdAt) - new Date(a.createdAt);
        });
      });

      setSelected([]);
    } catch (error) {
      console.error(error);
    } finally {
      setMarkingRead(false);
    }
  };

  // Delete message
  const deleteMessage = async () => {
    if (!deleteId) return;

    try {
      setDeleting(true);

      const res = await fetch(`/api/admin/messages/${deleteId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete message");
      }

      setMessages((prev) => prev.filter((message) => message._id !== deleteId));

      setSelected((prev) => prev.filter((id) => id !== deleteId));

      setDeleteId(null);
    } catch (error) {
      console.error(error);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="animate-spin" size={28} />
      </div>
    );
  }

  return (
    <>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Messages</h1>

            <p className="mt-2 text-gray-500">
              Messages received from your website.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Mail size={24} />

            <span className="font-medium">{messages.length}</span>
          </div>
        </div>

        {/* Toolbar */}
        {selected.length > 0 && (
          <div className="mb-4 flex items-center justify-between rounded-xl border bg-white px-5 py-3 shadow-sm">
            <span className="text-sm text-gray-600">
              {selected.length} selected
            </span>

            <button
              onClick={markAsRead}
              disabled={markingRead}
              className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
            >
              {markingRead ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Check size={16} />
              )}
              Mark as read
            </button>
          </div>
        )}

        {/* Messages */}
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          {/* Table header */}
          <div className="grid grid-cols-[50px_1fr_1.5fr_2fr_100px_60px] items-center border-b bg-gray-50 px-5 py-4 text-sm font-medium text-gray-500">
            <div>
              <input
                type="checkbox"
                checked={
                  messages.length > 0 && selected.length === messages.length
                }
                onChange={toggleAll}
                className="h-4 w-4"
              />
            </div>

            <div>Name</div>

            <div>Email</div>

            <div>Message</div>

            <div>Status</div>

            <div></div>
          </div>

          {/* Empty */}
          {messages.length === 0 && (
            <div className="flex min-h-[300px] flex-col items-center justify-center text-gray-400">
              <Mail size={40} />

              <p className="mt-3">No messages yet.</p>
            </div>
          )}

          {/* Rows */}
          {messages.map((message) => (
            <div
              key={message._id}
              className={`
                grid
                grid-cols-[50px_1fr_1.5fr_2fr_100px_60px]
                items-center
                border-b
                px-5
                py-4
                transition
                hover:bg-gray-50
                ${!message.read ? "bg-blue-50/40" : ""}
              `}
            >
              {/* Checkbox */}
              <div>
                <input
                  type="checkbox"
                  checked={selected.includes(message._id)}
                  onChange={() => toggleMessage(message._id)}
                  className="h-4 w-4"
                />
              </div>

              {/* Name */}
              <div className="font-medium text-gray-900">{message.name}</div>

              {/* Email */}
              <div className="truncate pr-4 text-sm text-gray-600">
                {message.email}
              </div>

              {/* Description */}
              <div className="truncate pr-5 text-sm text-gray-600">
                {message.description}
              </div>

              {/* Status */}
              <div>
                {message.read ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                    <Check size={12} />
                    Read
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    <Circle size={8} fill="currentColor" />
                    Unread
                  </span>
                )}
              </div>

              {/* Delete */}
              <div>
                <button
                  onClick={() => setDeleteId(message._id)}
                  className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                  title="Delete message"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation */}
      <DeleteConfirmation
        open={deleteId !== null}
        onCancel={() => {
          if (!deleting) {
            setDeleteId(null);
          }
        }}
        onConfirm={deleteMessage}
      />
    </>
  );
}
