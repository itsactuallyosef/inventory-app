export async function createNotification(message: string) {
  const res = await fetch("/api/notifications", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to send notification");
  }

  return res.json();
}

export async function getNotifications() {
  const res = await fetch("/api/notifications");
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to fetch notifications");
  }
  return res.json(); // assumed to return Notification[]
}

export async function deleteNotification(id: string) {
  const res = await fetch(`/api/notifications/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete notification");
}
