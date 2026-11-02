"use client";

import { toast } from "sonner";

function escapeHtml(value) {
  return String(value ?? "—").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}

export default function BookingReceiptButton({ booking }) {
  function downloadReceipt() {
    const receipt = window.open("", "_blank", "width=800,height=900");
    if (!receipt) {
      toast.error("Allow pop-ups to download your receipt.");
      return;
    }
    const fields = [
      ["Booking reference", booking._id],
      ["Studio", booking.studioTitle],
      ["Date", booking.date],
      ["Start time", booking.startTime],
      ["Duration", `${booking.durationHours} ${booking.durationHours === 1 ? "hour" : "hours"}`],
      ["Booking status", booking.status],
      ["Total paid", `$${booking.totalPrice}`],
    ];
    receipt.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>StudioSpace booking receipt</title><style>
      *{box-sizing:border-box}body{margin:0;padding:48px;background:#f4f4f5;color:#18181b;font:15px/1.5 Arial,sans-serif}.receipt{max-width:680px;margin:auto;padding:44px;background:white;border:1px solid #e4e4e7;border-radius:20px}.brand{color:#b45309;font-weight:700;letter-spacing:.04em}.rule{height:3px;background:#f59e0b;border:0;margin:24px 0}h1{font-size:30px;margin:8px 0}p{color:#52525b}.row{display:flex;justify-content:space-between;gap:20px;padding:14px 0;border-bottom:1px solid #e4e4e7}.row span:first-child{color:#71717a}.row strong{text-align:right}.total{font-size:20px}.foot{margin-top:30px;font-size:12px;color:#71717a}@media print{body{background:white;padding:0}.receipt{border:0;border-radius:0;padding:20px;max-width:none}}
      </style></head><body><main class="receipt"><div class="brand">StudioSpace</div><h1>Booking receipt</h1><p>Thanks for creating with StudioSpace. Keep this receipt for your records.</p><hr class="rule">${fields.map(([label, value]) => `<div class="row ${label === "Total paid" ? "total" : ""}"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("")}<p class="foot">This receipt confirms the booking details shown above. Generated ${escapeHtml(new Date().toLocaleDateString())}.</p></main><script>window.addEventListener('load',()=>{window.focus();window.print()})<\/script></body></html>`);
    receipt.document.close();
  }

  return (
    <button
      type="button"
      onClick={downloadReceipt}
      className="shrink-0 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
    >
      Save receipt as PDF
    </button>
  );
}
