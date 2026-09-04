"use strict";
const { useState, useMemo, useEffect } = React;
// ---- Inline icons (no external icon package needed) ----
function Icon({ paths, size = 24, className = "", style = {}, color = "currentColor", strokeWidth = 2 }) {
    return (React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", className: className, style: style }, paths));
}
const Search = (p) => React.createElement(Icon, { ...p, paths: React.createElement(React.Fragment, null,
        React.createElement("circle", { cx: "11", cy: "11", r: "8" }),
        React.createElement("path", { d: "m21 21-4.3-4.3" })) });
const Plus = (p) => React.createElement(Icon, { ...p, paths: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M5 12h14" }),
        React.createElement("path", { d: "M12 5v14" })) });
const X = (p) => React.createElement(Icon, { ...p, paths: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M18 6 6 18" }),
        React.createElement("path", { d: "m6 6 12 12" })) });
const ChevronUp = (p) => React.createElement(Icon, { ...p, paths: React.createElement("path", { d: "m18 15-6-6-6 6" }) });
const ChevronDown = (p) => React.createElement(Icon, { ...p, paths: React.createElement("path", { d: "m6 9 6 6 6-6" }) });
const Circle = (p) => React.createElement(Icon, { ...p, paths: React.createElement("circle", { cx: "12", cy: "12", r: "10" }) });
const Clock = (p) => React.createElement(Icon, { ...p, paths: React.createElement(React.Fragment, null,
        React.createElement("circle", { cx: "12", cy: "12", r: "10" }),
        React.createElement("path", { d: "M12 6v6l4 2" })) });
const CheckCircle2 = (p) => React.createElement(Icon, { ...p, paths: React.createElement(React.Fragment, null,
        React.createElement("circle", { cx: "12", cy: "12", r: "10" }),
        React.createElement("path", { d: "m9 12 2 2 4-4" })) });
const AlertTriangle = (p) => React.createElement(Icon, { ...p, paths: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "m21.7 18-8.2-14a2 2 0 0 0-3.4 0l-8.2 14A2 2 0 0 0 3.6 21h16.8a2 2 0 0 0 1.7-3Z" }),
        React.createElement("path", { d: "M12 9v4" }),
        React.createElement("path", { d: "M12 17h.01" })) });
const Trash2 = (p) => React.createElement(Icon, { ...p, paths: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M3 6h18" }),
        React.createElement("path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }),
        React.createElement("path", { d: "M10 11v6" }),
        React.createElement("path", { d: "M14 11v6" })) });
const CalendarDays = (p) => React.createElement(Icon, { ...p, paths: React.createElement(React.Fragment, null,
        React.createElement("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }),
        React.createElement("path", { d: "M16 2v4" }),
        React.createElement("path", { d: "M8 2v4" }),
        React.createElement("path", { d: "M3 10h18" }),
        React.createElement("path", { d: "M8 14h.01" }),
        React.createElement("path", { d: "M12 14h.01" }),
        React.createElement("path", { d: "M16 14h.01" }),
        React.createElement("path", { d: "M8 18h.01" }),
        React.createElement("path", { d: "M12 18h.01" })) });
const CalendarPlus = (p) => React.createElement(Icon, { ...p, paths: React.createElement(React.Fragment, null,
        React.createElement("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }),
        React.createElement("path", { d: "M16 2v4" }),
        React.createElement("path", { d: "M8 2v4" }),
        React.createElement("path", { d: "M3 10h18" }),
        React.createElement("path", { d: "M12 14v6" }),
        React.createElement("path", { d: "M9 17h6" })) });
const ExternalLink = (p) => React.createElement(Icon, { ...p, paths: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M15 3h6v6" }),
        React.createElement("path", { d: "M10 14 21 3" }),
        React.createElement("path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" })) });
const ListChecks = (p) => React.createElement(Icon, { ...p, paths: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "m3 7 2 2 4-4" }),
        React.createElement("path", { d: "m3 17 2 2 4-4" }),
        React.createElement("path", { d: "M13 6h8" }),
        React.createElement("path", { d: "M13 12h8" }),
        React.createElement("path", { d: "M13 18h8" })) });
const Check = (p) => React.createElement(Icon, { ...p, paths: React.createElement("path", { d: "M20 6 9 17l-5-5" }) });
const Grid2x2 = (p) => React.createElement(Icon, { ...p, paths: React.createElement(React.Fragment, null,
        React.createElement("rect", { x: "3", y: "3", width: "8", height: "8", rx: "1" }),
        React.createElement("rect", { x: "13", y: "3", width: "8", height: "8", rx: "1" }),
        React.createElement("rect", { x: "3", y: "13", width: "8", height: "8", rx: "1" }),
        React.createElement("rect", { x: "13", y: "13", width: "8", height: "8", rx: "1" })) });
// ---- Storage shim: same async interface as the Claude artifact API, ----
// ---- backed by the browser's own localStorage on a real deployment. ----
window.storage = window.storage || {
    async get(key) {
        try {
            const raw = localStorage.getItem(key);
            if (raw === null)
                throw new Error("not found");
            return { key, value: raw, shared: false };
        }
        catch (e) {
            throw e;
        }
    },
    async set(key, value) {
        try {
            localStorage.setItem(key, value);
            return { key, value, shared: false };
        }
        catch (e) {
            return null;
        }
    },
    async delete(key) {
        localStorage.removeItem(key);
        return { key, deleted: true, shared: false };
    },
    async list(prefix) {
        const keys = Object.keys(localStorage).filter((k) => !prefix || k.startsWith(prefix));
        return { keys, prefix, shared: false };
    },
};
// ============================================================
// Google Calendar sync (two-way)
// ============================================================
// 1) Create OAuth credentials at https://console.cloud.google.com
//    (enable "Google Calendar API", create an OAuth Client ID of
//    type "Web application", add your GitHub Pages URL as an
//    Authorized JavaScript origin) — see README.md for full steps.
// 2) Paste the Client ID below.
const GOOGLE_CLIENT_ID = "824631456876-fhr1qlle5cqajs51g2jec6k5kida39e2.apps.googleusercontent.com";
const GOOGLE_CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar.events";
const GCAL_EVENTS_URL = "https://www.googleapis.com/calendar/v3/calendars/primary/events";
const LOCAL_TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
const toRFC3339 = (dateStr, timeStr) => `${dateStr}T${timeStr}:00`;
async function gcalListEvents(token, timeMinISO, timeMaxISO) {
    const params = new URLSearchParams({
        timeMin: timeMinISO,
        timeMax: timeMaxISO,
        singleEvents: "true",
        orderBy: "startTime",
        maxResults: "250",
    });
    const res = await fetch(`${GCAL_EVENTS_URL}?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok)
        throw new Error(`gcal_list_${res.status}`);
    const data = await res.json();
    return data.items || [];
}
async function gcalInsertEvent(token, { summary, description, startISO, endISO }) {
    const res = await fetch(GCAL_EVENTS_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
            summary,
            description,
            start: { dateTime: startISO, timeZone: LOCAL_TZ },
            end: { dateTime: endISO, timeZone: LOCAL_TZ },
        }),
    });
    if (!res.ok)
        throw new Error(`gcal_insert_${res.status}`);
    return res.json();
}
async function gcalUpdateEvent(token, eventId, { summary, description, startISO, endISO }) {
    const res = await fetch(`${GCAL_EVENTS_URL}/${eventId}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
            summary,
            description,
            start: { dateTime: startISO, timeZone: LOCAL_TZ },
            end: { dateTime: endISO, timeZone: LOCAL_TZ },
        }),
    });
    if (!res.ok)
        throw new Error(`gcal_update_${res.status}`);
    return res.json();
}
async function gcalDeleteEvent(token, eventId) {
    await fetch(`${GCAL_EVENTS_URL}/${eventId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    }).catch(() => { });
}
const PRIORITY = ["สูง", "กลาง", "ต่ำ"];
const CATEGORY = ["งานเรียน", "งานส่วนตัว", "โปรเจกต์", "อื่นๆ"];
const STATUS_STYLE = {
    "To Do": { bg: "#F3F4F6", fg: "#6B7280", dot: "#9CA3AF" },
    "Doing": { bg: "#FEF3E2", fg: "#B45309", dot: "#F59E0B" },
    "Review": { bg: "#F1EEFE", fg: "#6D28D9", dot: "#8B5CF6" },
    "Done": { bg: "#E7F8F0", fg: "#047857", dot: "#10B981" },
    "Blocked": { bg: "#FDECEC", fg: "#B91C1C", dot: "#EF4444" },
};
const PRIORITY_STYLE = {
    "สูง": "#EF4444",
    "กลาง": "#F59E0B",
    "ต่ำ": "#9CA3AF",
};
const todayISO = () => new Date().toISOString().slice(0, 10);
const daysUntil = (dateStr) => {
    if (!dateStr)
        return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const d = new Date(dateStr);
    d.setHours(0, 0, 0, 0);
    return Math.round((d - today) / 86400000);
};
// A task counts as "urgent" (for the priority matrix) when its deadline
// is overdue or within the next 3 days, and it isn't already Done.
const URGENT_THRESHOLD_DAYS = 5;
const isUrgent = (task) => {
    if (task.status === "Done")
        return false;
    const d = daysUntil(task.deadline);
    if (d === null)
        return false;
    return d <= URGENT_THRESHOLD_DAYS;
};
// ---- Calendar helpers ----
// Google Calendar wants UTC times in YYYYMMDDTHHMMSSZ. We treat the
// date+time the user picked as local time and convert to that format.
const toGCalUTC = (dateStr, timeStr) => {
    if (!dateStr || !timeStr)
        return null;
    const local = new Date(`${dateStr}T${timeStr}:00`);
    const pad = (n) => String(n).padStart(2, "0");
    return (local.getUTCFullYear() +
        pad(local.getUTCMonth() + 1) +
        pad(local.getUTCDate()) +
        "T" +
        pad(local.getUTCHours()) +
        pad(local.getUTCMinutes()) +
        pad(local.getUTCSeconds()) +
        "Z");
};
const buildGCalUrl = (item) => {
    if (!item.workDate || !item.workStart || !item.workEnd)
        return null;
    const start = toGCalUTC(item.workDate, item.workStart);
    const end = toGCalUTC(item.workDate, item.workEnd);
    if (!start || !end)
        return null;
    const details = item.gcalDetails || "";
    const params = new URLSearchParams({
        action: "TEMPLATE",
        text: item.gcalTitle || item.name,
        dates: `${start}/${end}`,
        details,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
};
// Wraps a task into the generic shape buildGCalUrl expects
const taskToGCalItem = (task) => ({
    ...task,
    gcalTitle: task.name,
    gcalDetails: [
        task.next ? `Next action: ${task.next}` : "",
        task.blocker ? `Blocker: ${task.blocker}` : "",
        `หมวดหมู่: ${task.category} | Priority: ${task.priority}`,
    ]
        .filter(Boolean)
        .join("\n"),
});
// Wraps a subtask into the generic shape, prefixed with parent task name
const subtaskToGCalItem = (subtask, parentTask) => ({
    ...subtask,
    gcalTitle: `${parentTask.name} · ${subtask.title}`,
    gcalDetails: `Task ย่อยของ: ${parentTask.name}\nหมวดหมู่: ${parentTask.category}`,
});
const formatSessionTime = (dateStr, startStr, endStr) => {
    if (!dateStr)
        return "";
    const d = new Date(`${dateStr}T00:00:00`);
    const dayLabel = d.toLocaleDateString("th-TH", { weekday: "short", day: "numeric", month: "short" });
    if (!startStr || !endStr)
        return dayLabel;
    return `${dayLabel} · ${startStr}–${endStr}`;
};
const seedTasks = [
    {
        id: 1,
        name: "ทำรายงานบัญชี บทที่ 5",
        category: "งานเรียน",
        owner: "Tarn",
        priority: "สูง",
        important: true,
        start: "2026-08-25",
        deadline: "2026-09-05",
        status: "Doing",
        progress: 40,
        next: "อ่าน TAS เพิ่มบทที่ 5",
        blocker: "รอข้อมูลจากอาจารย์",
        updated: "2026-08-28",
        workDate: "2026-09-02",
        workStart: "19:00",
        workEnd: "21:00",
        subtasks: [
            { id: 1, title: "อ่านเนื้อหา TAS บทที่ 5", done: true, workDate: "2026-08-26", workStart: "19:00", workEnd: "20:00" },
            { id: 2, title: "สรุปประเด็นสำคัญลงสมุด", done: true, workDate: "2026-08-27", workStart: "19:00", workEnd: "19:30" },
            { id: 3, title: "ทำแบบฝึกหัดท้ายบท", done: false, workDate: "2026-09-02", workStart: "19:00", workEnd: "20:30" },
            { id: 4, title: "เขียนรายงานส่ง", done: false, workDate: "", workStart: "", workEnd: "" },
        ],
    },
    {
        id: 2,
        name: "อ่านหนังสือสอบ Intermediate Accounting",
        category: "งานเรียน",
        owner: "Tarn",
        priority: "กลาง",
        important: false,
        start: "2026-08-20",
        deadline: "2026-09-10",
        status: "To Do",
        progress: 0,
        next: "เริ่มอ่านบทที่ 1-3",
        blocker: "",
        updated: "2026-08-20",
        workDate: "",
        workStart: "",
        workEnd: "",
        subtasks: [],
    },
    {
        id: 3,
        name: "ส่งการบ้านบทที่ 4",
        category: "งานเรียน",
        owner: "Tarn",
        priority: "สูง",
        important: false,
        start: "2026-08-15",
        deadline: "2026-08-27",
        status: "Done",
        progress: 100,
        next: "",
        blocker: "",
        updated: "2026-08-27",
        workDate: "",
        workStart: "",
        workEnd: "",
        subtasks: [],
    },
    {
        id: 4,
        name: "ออกแบบสติกเกอร์ amu.amu รอบใหม่",
        category: "โปรเจกต์",
        owner: "Tarn",
        priority: "กลาง",
        important: true,
        start: "2026-08-22",
        deadline: "2026-09-01",
        status: "Review",
        progress: 80,
        next: "รอฟีดแบ็กจากลูกค้า",
        blocker: "",
        updated: "2026-08-27",
        workDate: "2026-08-31",
        workStart: "14:00",
        workEnd: "15:30",
        subtasks: [
            { id: 1, title: "ออกแบบ mockup 3 แบบ", done: true, workDate: "2026-08-25", workStart: "10:00", workEnd: "12:00" },
            { id: 2, title: "ส่งให้ลูกค้าเลือก", done: true, workDate: "", workStart: "", workEnd: "" },
            { id: 3, title: "ปรับตามฟีดแบ็ก", done: false, workDate: "2026-08-31", workStart: "16:00", workEnd: "17:00" },
        ],
    },
    {
        id: 5,
        name: "ทวนโจทย์สอบ TAS เก่า 3 ปี",
        category: "งานเรียน",
        owner: "Tarn",
        priority: "สูง",
        important: true,
        start: "2026-08-26",
        deadline: "2026-08-30",
        status: "Blocked",
        progress: 15,
        next: "หาไฟล์ข้อสอบเก่าจากรุ่นพี่",
        blocker: "ยังหาไฟล์ไม่ได้",
        updated: "2026-08-28",
        workDate: "",
        workStart: "",
        workEnd: "",
        subtasks: [],
    },
];
function StatusPill({ value, onChange }) {
    const [open, setOpen] = useState(false);
    const s = STATUS_STYLE[value];
    return (React.createElement("div", { className: "relative", onClick: (e) => e.stopPropagation() },
        React.createElement("button", { onClick: () => setOpen((o) => !o), className: "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-transform active:scale-95", style: { background: s.bg, color: s.fg } },
            React.createElement("span", { className: "h-1.5 w-1.5 rounded-full", style: { background: s.dot } }),
            value),
        open && (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "fixed inset-0 z-10", onClick: () => setOpen(false) }),
            React.createElement("div", { className: "absolute left-0 top-full z-20 mt-1 w-32 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg" }, STATUS.map((st) => (React.createElement("button", { key: st, onClick: () => {
                    onChange(st);
                    setOpen(false);
                }, className: "flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs hover:bg-gray-50" },
                React.createElement("span", { className: "h-1.5 w-1.5 rounded-full", style: { background: STATUS_STYLE[st].dot } }),
                React.createElement("span", { style: { color: "#1F2430" } }, st)))))))));
}
function ProgressBar({ value, onChange }) {
    return (React.createElement("div", { className: "flex items-center gap-2", onClick: (e) => e.stopPropagation() },
        React.createElement("div", { className: "relative h-1.5 w-20 overflow-hidden rounded-full bg-gray-100" },
            React.createElement("div", { className: "h-full rounded-full transition-all", style: { width: `${value}%`, background: value === 100 ? "#10B981" : "#4F5DFF" } })),
        React.createElement("input", { type: "number", min: 0, max: 100, value: value, onChange: (e) => onChange(Math.max(0, Math.min(100, Number(e.target.value) || 0))), className: "w-10 rounded border border-transparent bg-transparent text-right text-xs tabular-nums text-gray-500 focus:border-gray-300 focus:bg-white focus:outline-none", style: { fontFamily: "'JetBrains Mono', monospace" } }),
        React.createElement("span", { className: "text-xs text-gray-400" }, "%")));
}
function DeadlineBadge({ deadline, status }) {
    const d = daysUntil(deadline);
    if (d === null)
        return React.createElement("span", { className: "text-xs text-gray-300" }, "\u2014");
    const done = status === "Done";
    let color = "#6B7280";
    let bg = "transparent";
    let label = `${d} วัน`;
    if (!done) {
        if (d < 0) {
            color = "#B91C1C";
            bg = "#FDECEC";
            label = `เลย ${Math.abs(d)} วัน`;
        }
        else if (d <= 3) {
            color = "#B45309";
            bg = "#FEF3E2";
            label = `อีก ${d} วัน`;
        }
        else if (d <= 7) {
            color = "#92400E";
            bg = "#FFFBEB";
            label = `อีก ${d} วัน`;
        }
    }
    return (React.createElement("span", { className: "inline-block rounded px-1.5 py-0.5 text-xs tabular-nums", style: { color, background: bg, fontFamily: "'JetBrains Mono', monospace" } }, label));
}
function KpiCard({ label, value, icon: Icon, tint }) {
    return (React.createElement("div", { className: "flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3.5" },
        React.createElement("div", { className: "flex items-center justify-between" },
            React.createElement("span", { className: "text-xs font-medium text-gray-500" }, label),
            React.createElement(Icon, { size: 14, style: { color: tint }, strokeWidth: 2 })),
        React.createElement("div", { className: "mt-1.5 text-2xl font-semibold tabular-nums", style: { color: "#1F2430", fontFamily: "'JetBrains Mono', monospace" } }, value)));
}
function Th({ children, sortKey, sort, setSort, align = "left" }) {
    const active = sort.key === sortKey;
    return (React.createElement("th", { onClick: () => setSort((s) => s.key === sortKey ? { key: sortKey, dir: s.dir === "asc" ? "desc" : "asc" } : { key: sortKey, dir: "asc" }), className: "cursor-pointer select-none whitespace-nowrap px-3 py-2.5 text-xs font-semibold text-gray-500 hover:text-gray-700", style: { textAlign: align } },
        React.createElement("span", { className: "inline-flex items-center gap-1" },
            children,
            active &&
                (sort.dir === "asc" ? React.createElement(ChevronUp, { size: 12 }) : React.createElement(ChevronDown, { size: 12 })))));
}
function SubtaskRow({ subtask, parentTask, onToggle, onDelete, onUpdate, googleToken, onPushToGoogle }) {
    const [open, setOpen] = useState(false);
    const hasBooking = subtask.workDate && subtask.workStart && subtask.workEnd;
    const gcalUrl = hasBooking ? buildGCalUrl(subtaskToGCalItem(subtask, parentTask)) : null;
    return (React.createElement("div", { className: "rounded-lg bg-white border border-gray-100 overflow-hidden" },
        React.createElement("div", { className: "group flex items-center gap-2 px-2.5 py-1.5" },
            React.createElement("button", { onClick: () => onToggle(subtask.id), className: "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors", style: {
                    background: subtask.done ? "#10B981" : "white",
                    borderColor: subtask.done ? "#10B981" : "#D1D5DB",
                } }, subtask.done && React.createElement(Check, { size: 11, color: "white", strokeWidth: 3 })),
            React.createElement("span", { className: `flex-1 text-xs ${subtask.done ? "text-gray-400 line-through" : "text-[#1F2430]"}` }, subtask.title),
            hasBooking && (React.createElement("span", { className: "shrink-0 text-[10px] text-[#4F5DFF]", style: { fontFamily: "'JetBrains Mono', monospace" } }, subtask.workStart)),
            subtask.gcalEventId && (React.createElement("span", { title: "\u0E0B\u0E34\u0E07\u0E04\u0E4C\u0E01\u0E31\u0E1A Google Calendar \u0E41\u0E25\u0E49\u0E27" },
                React.createElement(Check, { size: 11, className: "shrink-0 text-[#4F5DFF]" }))),
            React.createElement("button", { onClick: () => setOpen((o) => !o), className: `shrink-0 rounded p-0.5 transition-colors ${hasBooking ? "text-[#4F5DFF]" : "text-gray-300 opacity-0 group-hover:opacity-100"} hover:bg-gray-100`, title: "\u0E08\u0E2D\u0E07\u0E40\u0E27\u0E25\u0E32\u0E17\u0E33\u0E07\u0E32\u0E19" },
                React.createElement(CalendarPlus, { size: 12 })),
            React.createElement("button", { onClick: () => onDelete(subtask.id), className: "shrink-0 text-gray-300 opacity-0 group-hover:opacity-100 hover:text-red-500" },
                React.createElement(X, { size: 12 }))),
        open && (React.createElement("div", { className: "border-t border-gray-100 bg-gray-50/60 px-2.5 py-2" },
            React.createElement("div", { className: "mb-1.5" },
                React.createElement("input", { type: "date", value: subtask.workDate, onChange: (e) => onUpdate(subtask.id, { workDate: e.target.value }), className: "w-full rounded-md border border-gray-200 bg-white px-2 py-1 text-[11px] focus:border-[#4F5DFF] focus:outline-none" })),
            React.createElement("div", { className: "grid grid-cols-2 gap-1.5" },
                React.createElement("input", { type: "time", value: subtask.workStart, onChange: (e) => onUpdate(subtask.id, { workStart: e.target.value }), className: "w-full rounded-md border border-gray-200 bg-white px-2 py-1 text-[11px] focus:border-[#4F5DFF] focus:outline-none" }),
                React.createElement("input", { type: "time", value: subtask.workEnd, onChange: (e) => onUpdate(subtask.id, { workEnd: e.target.value }), className: "w-full rounded-md border border-gray-200 bg-white px-2 py-1 text-[11px] focus:border-[#4F5DFF] focus:outline-none" })),
            hasBooking &&
                (googleToken ? (React.createElement("button", { onClick: () => onPushToGoogle(subtask.id, {
                        title: `${parentTask.name} · ${subtask.title}`,
                        description: `Task ย่อยของ: ${parentTask.name}`,
                        workDate: subtask.workDate,
                        workStart: subtask.workStart,
                        workEnd: subtask.workEnd,
                        existingEventId: subtask.gcalEventId,
                    }), className: "mt-1.5 flex w-full items-center justify-center gap-1 rounded-md bg-[#4F5DFF] py-1.5 text-[11px] font-medium text-white hover:brightness-110" },
                    React.createElement(ExternalLink, { size: 11 }),
                    " ",
                    subtask.gcalEventId ? "อัปเดตใน Google Calendar" : "ซิงค์กับ Google Calendar")) : gcalUrl ? (React.createElement("a", { href: gcalUrl, target: "_blank", rel: "noopener noreferrer", className: "mt-1.5 flex w-full items-center justify-center gap-1 rounded-md bg-gray-400 py-1.5 text-[11px] font-medium text-white hover:brightness-110" },
                    React.createElement(ExternalLink, { size: 11 }),
                    " \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E25\u0E07 Google Calendar (\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E15\u0E48\u0E2D)")) : (React.createElement("p", { className: "mt-1.5 text-[11px] text-red-400" }, "\u0E40\u0E27\u0E25\u0E32\u0E2A\u0E34\u0E49\u0E19\u0E2A\u0E38\u0E14\u0E15\u0E49\u0E2D\u0E07\u0E2B\u0E25\u0E31\u0E07\u0E40\u0E27\u0E25\u0E32\u0E40\u0E23\u0E34\u0E48\u0E21")))))));
}
function SubtaskList({ task, onAdd, onToggle, onDelete, onUpdate, googleToken, onPushToGoogle }) {
    const [draft, setDraft] = useState("");
    const total = task.subtasks.length;
    const done = task.subtasks.filter((s) => s.done).length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    const submit = () => {
        if (!draft.trim())
            return;
        onAdd(draft);
        setDraft("");
    };
    return (React.createElement("div", { className: "rounded-xl border border-gray-100 bg-gray-50/70 p-3" },
        React.createElement("div", { className: "mb-2 flex items-center justify-between" },
            React.createElement("label", { className: "flex items-center gap-1.5 text-xs font-medium text-gray-500" },
                React.createElement(ListChecks, { size: 13 }),
                " Task \u0E22\u0E48\u0E2D\u0E22"),
            total > 0 && (React.createElement("span", { className: "text-[10px] tabular-nums text-gray-400", style: { fontFamily: "'JetBrains Mono', monospace" } },
                done,
                "/",
                total))),
        total > 0 && (React.createElement("div", { className: "mb-2.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-200" },
            React.createElement("div", { className: "h-full rounded-full transition-all", style: { width: `${pct}%`, background: pct === 100 ? "#10B981" : "#4F5DFF" } }))),
        React.createElement("div", { className: "mb-2 space-y-1" },
            task.subtasks.map((s) => (React.createElement(SubtaskRow, { key: s.id, subtask: s, parentTask: task, onToggle: onToggle, onDelete: onDelete, onUpdate: onUpdate, googleToken: googleToken, onPushToGoogle: onPushToGoogle }))),
            total === 0 && React.createElement("p", { className: "py-1 text-xs text-gray-400" }, "\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35 task \u0E22\u0E48\u0E2D\u0E22")),
        React.createElement("div", { className: "flex items-center gap-1.5" },
            React.createElement("input", { value: draft, onChange: (e) => setDraft(e.target.value), onKeyDown: (e) => {
                    if (e.key === "Enter")
                        submit();
                }, placeholder: "\u0E40\u0E1E\u0E34\u0E48\u0E21 task \u0E22\u0E48\u0E2D\u0E22...", className: "flex-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs focus:border-[#4F5DFF] focus:outline-none" }),
            React.createElement("button", { onClick: submit, className: "flex shrink-0 items-center justify-center rounded-lg bg-[#4F5DFF] px-2.5 py-1.5 text-white hover:brightness-110" },
                React.createElement(Plus, { size: 13 })))));
}
// Build a flat list of all bookable "sessions" — one per booked task
// and one per booked subtask — each carrying a reference back to its
// parent task so clicking it opens the right task in the drawer.
function collectSessions(tasks) {
    const sessions = [];
    tasks.forEach((t) => {
        if (t.workDate && t.workStart && t.workEnd) {
            sessions.push({
                key: `task-${t.id}`,
                kind: "task",
                parentTask: t,
                title: t.name,
                category: t.category,
                status: t.status,
                workDate: t.workDate,
                workStart: t.workStart,
                workEnd: t.workEnd,
                gcalEventId: t.gcalEventId || null,
            });
        }
        (t.subtasks || []).forEach((s) => {
            if (s.workDate && s.workStart && s.workEnd) {
                sessions.push({
                    key: `sub-${t.id}-${s.id}`,
                    kind: "subtask",
                    parentTask: t,
                    title: s.title,
                    category: t.category,
                    status: s.done ? "Done" : t.status,
                    workDate: s.workDate,
                    workStart: s.workStart,
                    workEnd: s.workEnd,
                    gcalEventId: s.gcalEventId || null,
                });
            }
        });
    });
    return sessions;
}
// Convert Google Calendar API events into the same session shape used
// for app-originated bookings, so both render in one grid. Events we
// pushed ourselves (id already tracked on a task/subtask) are skipped
// here since they're already shown via collectSessions above.
function googleEventsToSessions(googleEvents, pushedIds) {
    const out = [];
    googleEvents.forEach((ev) => {
        if (!ev.start || !ev.start.dateTime)
            return; // skip all-day events in the timed grid
        if (pushedIds.has(ev.id))
            return; // avoid showing our own pushed events twice
        const start = new Date(ev.start.dateTime);
        const end = ev.end && ev.end.dateTime ? new Date(ev.end.dateTime) : start;
        const pad = (n) => String(n).padStart(2, "0");
        out.push({
            key: `gcal-${ev.id}`,
            kind: "google",
            title: ev.summary || "(ไม่มีชื่อ)",
            status: "Google",
            workDate: toISODate(start),
            workStart: `${pad(start.getHours())}:${pad(start.getMinutes())}`,
            workEnd: `${pad(end.getHours())}:${pad(end.getMinutes())}`,
            htmlLink: ev.htmlLink,
        });
    });
    return out;
}
const startOfWeek = (d) => {
    const date = new Date(d);
    const day = date.getDay(); // 0 = Sunday
    date.setDate(date.getDate() - day);
    date.setHours(0, 0, 0, 0);
    return date;
};
const addDays = (d, n) => {
    const date = new Date(d);
    date.setDate(date.getDate() + n);
    return date;
};
const toISODate = (d) => {
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};
const WEEKDAY_LABELS = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
// Style for externally-synced Google Calendar events shown in the grid
const GOOGLE_STYLE = { bg: "#EEF2FF", fg: "#4338CA", dot: "#6366F1" };
function WeekGrid({ sessions, weekStart, onSelectSession }) {
    const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
    const todayStr = todayISO();
    const byDate = useMemo(() => {
        const map = {};
        sessions.forEach((s) => {
            if (!map[s.workDate])
                map[s.workDate] = [];
            map[s.workDate].push(s);
        });
        Object.values(map).forEach((arr) => arr.sort((a, b) => a.workStart.localeCompare(b.workStart)));
        return map;
    }, [sessions]);
    return (React.createElement("div", { className: "grid grid-cols-7 gap-2" }, days.map((d) => {
        const iso = toISODate(d);
        const isToday = iso === todayStr;
        const items = byDate[iso] || [];
        return (React.createElement("div", { key: iso, className: "flex min-h-[220px] flex-col rounded-xl border bg-white p-2", style: { borderColor: isToday ? "#4F5DFF" : "#E5E7EB" } },
            React.createElement("div", { className: "mb-1.5 flex items-center justify-between px-0.5" },
                React.createElement("span", { className: "text-[10px] font-medium text-gray-400" }, WEEKDAY_LABELS[d.getDay()]),
                React.createElement("span", { className: "flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold", style: {
                        background: isToday ? "#4F5DFF" : "transparent",
                        color: isToday ? "white" : "#1F2430",
                    } }, d.getDate())),
            React.createElement("div", { className: "flex-1 space-y-1" }, items.map((s) => {
                const st = s.kind === "google" ? GOOGLE_STYLE : STATUS_STYLE[s.status];
                const isGoogle = s.kind === "google";
                return (React.createElement("button", { key: s.key, onClick: () => (isGoogle ? window.open(s.htmlLink, "_blank") : onSelectSession(s)), className: "w-full rounded-md px-1.5 py-1 text-left transition-transform hover:scale-[1.02]", style: { background: st.bg, border: isGoogle ? "1px dashed #C7D2FE" : "none" } },
                    React.createElement("div", { className: "flex items-center gap-1 truncate text-[10px] font-semibold", style: { color: st.fg, fontFamily: "'JetBrains Mono', monospace" } },
                        isGoogle && React.createElement(CalendarDays, { size: 9 }),
                        s.workStart),
                    React.createElement("div", { className: "truncate text-[10px] leading-tight", style: { color: st.fg } },
                        s.kind === "subtask" && "↳ ",
                        s.title)));
            }))));
    })));
}
const MATRIX_QUADRANTS = [
    {
        key: "q1",
        title: "สำคัญ + เร่งด่วน",
        subtitle: "ทำทันที",
        important: true,
        urgent: true,
        accent: "#EF4444",
        bg: "#FEF2F2",
    },
    {
        key: "q2",
        title: "ไม่สำคัญ + เร่งด่วน",
        subtitle: "มอบหมาย หรือทำให้เสร็จเร็วๆ",
        important: false,
        urgent: true,
        accent: "#F59E0B",
        bg: "#FFFBEB",
    },
    {
        key: "q3",
        title: "สำคัญ + ไม่เร่งด่วน",
        subtitle: "วางแผนทำ",
        important: true,
        urgent: false,
        accent: "#4F5DFF",
        bg: "#F5F6FF",
    },
    {
        key: "q4",
        title: "ไม่สำคัญ + ไม่เร่งด่วน",
        subtitle: "ทำทีหลัง หรือตัดทิ้ง",
        important: false,
        urgent: false,
        accent: "#9CA3AF",
        bg: "#F9FAFB",
    },
];
function MatrixTaskCard({ task, onSelect, onToggleImportant }) {
    return (React.createElement("div", { onClick: () => onSelect(task), className: "cursor-pointer rounded-lg border border-gray-200 bg-white p-2.5 hover:border-gray-300" },
        React.createElement("div", { className: "flex items-start justify-between gap-2" },
            React.createElement("span", { className: "min-w-0 flex-1 truncate text-xs font-medium text-[#1F2430]" }, task.name),
            React.createElement("button", { onClick: (e) => {
                    e.stopPropagation();
                    onToggleImportant(task.id, !task.important);
                }, title: task.important ? "เอาออกจาก 'สำคัญ'" : "ทำเครื่องหมายว่า 'สำคัญ'", className: "shrink-0" },
                React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: task.important ? "#F59E0B" : "none", stroke: task.important ? "#F59E0B" : "#D1D5DB", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
                    React.createElement("polygon", { points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" })))),
        React.createElement("div", { className: "mt-1.5 flex items-center gap-1.5" },
            React.createElement(DeadlineBadge, { deadline: task.deadline, status: task.status }),
            React.createElement("span", { className: "rounded-full px-1.5 py-0.5 text-[10px] font-medium", style: { background: STATUS_STYLE[task.status].bg, color: STATUS_STYLE[task.status].fg } }, task.status))));
}
function MatrixView({ tasks, onSelectTask, onToggleImportant }) {
    const buckets = useMemo(() => {
        const map = { q1: [], q2: [], q3: [], q4: [] };
        tasks.forEach((t) => {
            const urgent = isUrgent(t);
            const important = !!t.important;
            const q = MATRIX_QUADRANTS.find((q) => q.important === important && q.urgent === urgent);
            map[q.key].push(t);
        });
        return map;
    }, [tasks]);
    const activeTasks = tasks.filter((t) => t.status !== "Done").length;
    return (React.createElement("div", null,
        React.createElement("p", { className: "mb-4 text-xs text-gray-400" },
            "\"\u0E2A\u0E33\u0E04\u0E31\u0E0D\" \u0E01\u0E33\u0E2B\u0E19\u0E14\u0E40\u0E2D\u0E07\u0E44\u0E14\u0E49 (\u0E01\u0E14\u0E23\u0E39\u0E1B\u0E14\u0E32\u0E27\u0E17\u0E35\u0E48\u0E01\u0E32\u0E23\u0E4C\u0E14) \u00B7 \"\u0E40\u0E23\u0E48\u0E07\u0E14\u0E48\u0E27\u0E19\" \u0E04\u0E33\u0E19\u0E27\u0E13\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34\u0E08\u0E32\u0E01 deadline (\u0E40\u0E2B\u0E25\u0E37\u0E2D \u2264 ",
            URGENT_THRESHOLD_DAYS,
            " \u0E27\u0E31\u0E19 \u0E2B\u0E23\u0E37\u0E2D\u0E40\u0E25\u0E22\u0E01\u0E33\u0E2B\u0E19\u0E14)"),
        React.createElement("div", { className: "grid grid-cols-2 gap-3" }, MATRIX_QUADRANTS.map((q) => {
            const items = buckets[q.key];
            return (React.createElement("div", { key: q.key, className: "flex min-h-[260px] flex-col rounded-xl border p-3", style: { borderColor: q.accent + "40", background: q.bg } },
                React.createElement("div", { className: "mb-2.5 flex items-center justify-between" },
                    React.createElement("div", null,
                        React.createElement("div", { className: "flex items-center gap-1.5" },
                            React.createElement("span", { className: "h-2 w-2 rounded-full", style: { background: q.accent } }),
                            React.createElement("span", { className: "text-xs font-semibold", style: { color: q.accent } }, q.title)),
                        React.createElement("p", { className: "mt-0.5 text-[10px] text-gray-400" }, q.subtitle)),
                    React.createElement("span", { className: "rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums", style: { background: "white", color: q.accent } }, items.length)),
                React.createElement("div", { className: "flex-1 space-y-1.5" },
                    items.length === 0 && React.createElement("p", { className: "py-4 text-center text-[11px] text-gray-300" }, "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E07\u0E32\u0E19\u0E43\u0E19\u0E2B\u0E21\u0E27\u0E14\u0E19\u0E35\u0E49"),
                    items.map((t) => (React.createElement(MatrixTaskCard, { key: t.id, task: t, onSelect: onSelectTask, onToggleImportant: onToggleImportant }))))));
        })),
        activeTasks === 0 && (React.createElement("p", { className: "mt-4 text-center text-xs text-gray-400" }, "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E07\u0E32\u0E19\u0E04\u0E49\u0E32\u0E07\u0E2D\u0E22\u0E39\u0E48 \u2014 \u0E40\u0E22\u0E35\u0E48\u0E22\u0E21\u0E21\u0E32\u0E01 \uD83C\uDF89"))));
}
function CalendarView({ tasks, onSelectTask, googleEvents = [] }) {
    const appSessions = useMemo(() => collectSessions(tasks), [tasks]);
    const pushedIds = useMemo(() => {
        const ids = new Set();
        appSessions.forEach((s) => s.gcalEventId && ids.add(s.gcalEventId));
        return ids;
    }, [appSessions]);
    const externalSessions = useMemo(() => googleEventsToSessions(googleEvents, pushedIds), [googleEvents, pushedIds]);
    const sessions = useMemo(() => [...appSessions, ...externalSessions], [appSessions, externalSessions]);
    const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()));
    const unbooked = tasks.filter((t) => !t.workDate && t.status !== "Done");
    const weekLabel = useMemo(() => {
        const end = addDays(weekStart, 6);
        const optsSame = { day: "numeric", month: "short" };
        const startLabel = weekStart.toLocaleDateString("th-TH", optsSame);
        const endLabel = end.toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric" });
        return `${startLabel} – ${endLabel}`;
    }, [weekStart]);
    const goToday = () => setWeekStart(startOfWeek(new Date()));
    const prevWeek = () => setWeekStart((w) => addDays(w, -7));
    const nextWeek = () => setWeekStart((w) => addDays(w, 7));
    const handleSelectSession = (session) => onSelectTask(session.parentTask);
    // sessions falling within the visible week, for a compact list under the grid
    const weekSessions = useMemo(() => {
        const end = addDays(weekStart, 7);
        return sessions
            .filter((s) => s.workDate >= toISODate(weekStart) && s.workDate < toISODate(end))
            .sort((a, b) => (a.workDate + a.workStart).localeCompare(b.workDate + b.workStart));
    }, [sessions, weekStart]);
    return (React.createElement("div", { className: "space-y-5" },
        React.createElement("div", { className: "flex items-center justify-between" },
            React.createElement("div", { className: "flex items-center gap-2" },
                React.createElement("button", { onClick: prevWeek, className: "rounded-lg border border-gray-200 bg-white p-1.5 text-gray-500 hover:border-gray-300" },
                    React.createElement(ChevronUp, { size: 14, className: "-rotate-90" })),
                React.createElement("button", { onClick: nextWeek, className: "rounded-lg border border-gray-200 bg-white p-1.5 text-gray-500 hover:border-gray-300" },
                    React.createElement(ChevronDown, { size: 14, className: "-rotate-90" })),
                React.createElement("span", { className: "text-sm font-medium text-[#1F2430]" }, weekLabel)),
            React.createElement("button", { onClick: goToday, className: "rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-500 hover:border-gray-300" }, "\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49")),
        React.createElement(WeekGrid, { sessions: sessions, weekStart: weekStart, onSelectSession: handleSelectSession }),
        weekSessions.length > 0 ? (React.createElement("div", null,
            React.createElement("div", { className: "mb-2 text-xs font-semibold text-gray-400" },
                "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E19\u0E35\u0E49 (",
                weekSessions.length,
                ")"),
            React.createElement("div", { className: "space-y-2" }, weekSessions.map((s) => {
                const isGoogle = s.kind === "google";
                const gcalUrl = isGoogle
                    ? s.htmlLink
                    : buildGCalUrl(s.kind === "task"
                        ? taskToGCalItem(s.parentTask)
                        : subtaskToGCalItem({ title: s.title, workDate: s.workDate, workStart: s.workStart, workEnd: s.workEnd }, s.parentTask));
                const st = isGoogle ? GOOGLE_STYLE : STATUS_STYLE[s.status];
                const d = new Date(`${s.workDate}T00:00:00`);
                const dayLabel = d.toLocaleDateString("th-TH", { weekday: "short", day: "numeric", month: "short" });
                const Content = (React.createElement(React.Fragment, null,
                    React.createElement("div", { className: "truncate text-sm font-medium text-[#1F2430]" },
                        s.kind === "subtask" && React.createElement("span", { className: "text-gray-400" }, "\u21B3 "),
                        s.title),
                    React.createElement("div", { className: "mt-0.5 flex items-center gap-2" },
                        React.createElement("span", { className: "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium", style: { background: st.bg, color: st.fg } },
                            React.createElement("span", { className: "h-1 w-1 rounded-full", style: { background: st.dot } }),
                            isGoogle ? "จาก Google" : s.status),
                        !isGoogle && (React.createElement("span", { className: "text-[10px] text-gray-400" }, s.kind === "subtask" ? s.parentTask.name : s.category)))));
                return (React.createElement("div", { key: s.key, className: "flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 hover:border-gray-300", style: isGoogle ? { borderStyle: "dashed" } : undefined },
                    React.createElement("div", { className: "flex w-20 shrink-0 flex-col items-center rounded-lg py-1.5 text-xs", style: { background: "#F5F6FF", color: "#4F5DFF" } },
                        React.createElement("span", { className: "text-[10px] text-gray-400" }, dayLabel),
                        React.createElement("span", { className: "font-semibold", style: { fontFamily: "'JetBrains Mono', monospace" } }, s.workStart)),
                    isGoogle ? (React.createElement("div", { className: "min-w-0 flex-1 text-left" }, Content)) : (React.createElement("button", { onClick: () => onSelectTask(s.parentTask), className: "min-w-0 flex-1 text-left" }, Content)),
                    gcalUrl && (React.createElement("a", { href: gcalUrl, target: "_blank", rel: "noopener noreferrer", onClick: (e) => e.stopPropagation(), className: "flex shrink-0 items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs text-gray-500 hover:border-[#4F5DFF] hover:text-[#4F5DFF]" },
                        React.createElement(ExternalLink, { size: 12 }),
                        " Google Calendar"))));
            })))) : (React.createElement("p", { className: "text-center text-xs text-gray-400 py-4" }, "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E07\u0E32\u0E19\u0E17\u0E35\u0E48\u0E08\u0E2D\u0E07\u0E40\u0E27\u0E25\u0E32\u0E44\u0E27\u0E49\u0E43\u0E19\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E19\u0E35\u0E49")),
        unbooked.length > 0 && (React.createElement("div", { className: "pt-2" },
            React.createElement("div", { className: "mb-2 text-xs font-semibold text-gray-400" },
                "\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E08\u0E2D\u0E07\u0E40\u0E27\u0E25\u0E32 (",
                unbooked.length,
                ")"),
            React.createElement("div", { className: "space-y-1.5" }, unbooked.map((t) => (React.createElement("button", { key: t.id, onClick: () => onSelectTask(t), className: "flex w-full items-center justify-between rounded-lg border border-dashed border-gray-200 bg-white px-3 py-2 text-left text-xs text-gray-500 hover:border-gray-300" },
                React.createElement("span", { className: "truncate" }, t.name),
                React.createElement("span", { className: "shrink-0 text-gray-300" }, "\u0E08\u0E2D\u0E07\u0E40\u0E27\u0E25\u0E32 \u2192")))))))));
}
const STORAGE_KEY = "task-ops:tasks:v1";
function TaskDashboard() {
    const [tasks, setTasks] = useState([]);
    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [catFilter, setCatFilter] = useState("all");
    const [sort, setSort] = useState({ key: "deadline", dir: "asc" });
    const [selected, setSelected] = useState(null);
    const [view, setView] = useState("tasks"); // "tasks" | "calendar" | "matrix"
    const [loaded, setLoaded] = useState(false);
    const [saveError, setSaveError] = useState(false);
    // ---- Google Calendar connection state ----
    const [googleToken, setGoogleToken] = useState(null);
    const [googleEvents, setGoogleEvents] = useState([]); // events pulled FROM Google (external, read-only in the grid)
    const [gcalSyncing, setGcalSyncing] = useState(false);
    const [gcalError, setGcalError] = useState("");
    const tokenClientRef = React.useRef(null);
    // Wait for the Google Identity Services script (loaded async in index.html)
    // to be ready, then set up the OAuth token client once.
    React.useEffect(() => {
        let tries = 0;
        const iv = setInterval(() => {
            tries++;
            if (window.google && window.google.accounts && window.google.accounts.oauth2) {
                tokenClientRef.current = window.google.accounts.oauth2.initTokenClient({
                    client_id: GOOGLE_CLIENT_ID,
                    scope: GOOGLE_CALENDAR_SCOPE,
                    callback: (tokenResponse) => {
                        if (tokenResponse && tokenResponse.access_token) {
                            setGoogleToken(tokenResponse.access_token);
                            setGcalError("");
                        }
                    },
                    error_callback: () => {
                        setGcalError("เชื่อมต่อ Google ไม่สำเร็จ ลองใหม่อีกครั้ง");
                    },
                });
                clearInterval(iv);
            }
            else if (tries > 50) {
                clearInterval(iv); // ~10s timeout — script likely blocked or offline
            }
        }, 200);
        return () => clearInterval(iv);
    }, []);
    const connectGoogle = () => {
        if (GOOGLE_CLIENT_ID.startsWith("YOUR_CLIENT_ID")) {
            setGcalError("ยังไม่ได้ตั้งค่า Google Client ID — ดูวิธีตั้งค่าใน README.md");
            return;
        }
        if (!tokenClientRef.current) {
            setGcalError("ระบบ Google ยังโหลดไม่เสร็จ ลองใหม่อีกครั้งใน 2-3 วินาที");
            return;
        }
        tokenClientRef.current.requestAccessToken({ prompt: "" });
    };
    const disconnectGoogle = () => {
        var _a, _b, _c;
        if (googleToken && ((_c = (_b = (_a = window.google) === null || _a === void 0 ? void 0 : _a.accounts) === null || _b === void 0 ? void 0 : _b.oauth2) === null || _c === void 0 ? void 0 : _c.revoke)) {
            window.google.accounts.oauth2.revoke(googleToken, () => { });
        }
        setGoogleToken(null);
        setGoogleEvents([]);
    };
    const fetchGoogleEvents = async (token) => {
        setGcalSyncing(true);
        setGcalError("");
        try {
            const timeMin = new Date();
            timeMin.setDate(timeMin.getDate() - 7);
            const timeMax = new Date();
            timeMax.setDate(timeMax.getDate() + 60);
            const items = await gcalListEvents(token, timeMin.toISOString(), timeMax.toISOString());
            setGoogleEvents(items);
        }
        catch (e) {
            if (String(e.message).includes("401")) {
                setGoogleToken(null);
                setGcalError("เซสชัน Google หมดอายุ กรุณาเชื่อมต่อใหม่");
            }
            else {
                setGcalError("ดึงข้อมูลจาก Google Calendar ไม่สำเร็จ");
            }
        }
        finally {
            setGcalSyncing(false);
        }
    };
    React.useEffect(() => {
        if (googleToken)
            fetchGoogleEvents(googleToken);
    }, [googleToken]);
    // Load saved tasks on first mount. Falls back to the seed example
    // tasks the very first time the app is opened (nothing saved yet).
    React.useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const result = await window.storage.get(STORAGE_KEY, false);
                if (cancelled)
                    return;
                if (result && result.value) {
                    setTasks(JSON.parse(result.value));
                }
                else {
                    setTasks(seedTasks);
                }
            }
            catch (e) {
                // Key not found yet, or storage unavailable — start from the examples.
                if (!cancelled)
                    setTasks(seedTasks);
            }
            finally {
                if (!cancelled)
                    setLoaded(true);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);
    // Persist to storage whenever tasks change, after the initial load.
    React.useEffect(() => {
        if (!loaded)
            return;
        (async () => {
            try {
                const result = await window.storage.set(STORAGE_KEY, JSON.stringify(tasks), false);
                setSaveError(!result);
            }
            catch (e) {
                setSaveError(true);
            }
        })();
    }, [tasks, loaded]);
    const updateTask = (id, patch) => {
        setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch, updated: todayISO() } : t)));
    };
    // Push a booked task/subtask time to Google Calendar — creates the
    // event on first sync, updates it on subsequent syncs (tracked via
    // the stored gcalEventId).
    const pushBookingToGoogle = async ({ taskId, subId, title, description, workDate, workStart, workEnd, existingEventId }) => {
        if (!googleToken)
            return;
        setGcalError("");
        try {
            const startISO = toRFC3339(workDate, workStart);
            const endISO = toRFC3339(workDate, workEnd);
            const result = existingEventId
                ? await gcalUpdateEvent(googleToken, existingEventId, { summary: title, description, startISO, endISO })
                : await gcalInsertEvent(googleToken, { summary: title, description, startISO, endISO });
            if (subId) {
                updateSubtask(taskId, subId, { gcalEventId: result.id });
            }
            else {
                updateTask(taskId, { gcalEventId: result.id });
            }
            fetchGoogleEvents(googleToken);
        }
        catch (e) {
            if (String(e.message).includes("401")) {
                setGoogleToken(null);
                setGcalError("เซสชัน Google หมดอายุ กรุณาเชื่อมต่อใหม่");
            }
            else {
                setGcalError("ซิงค์กับ Google Calendar ไม่สำเร็จ");
            }
        }
    };
    const deleteTask = (id) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
        setSelected(null);
    };
    const addSubtask = (taskId, title) => {
        if (!title.trim())
            return;
        setTasks((prev) => prev.map((t) => {
            if (t.id !== taskId)
                return t;
            const nextId = Math.max(0, ...t.subtasks.map((s) => s.id)) + 1;
            const newSub = { id: nextId, title: title.trim(), done: false, workDate: "", workStart: "", workEnd: "" };
            return { ...t, subtasks: [...t.subtasks, newSub], updated: todayISO() };
        }));
        setSelected((s) => {
            if (!s || s.id !== taskId)
                return s;
            const nextId = Math.max(0, ...s.subtasks.map((sub) => sub.id)) + 1;
            const newSub = { id: nextId, title: title.trim(), done: false, workDate: "", workStart: "", workEnd: "" };
            return { ...s, subtasks: [...s.subtasks, newSub] };
        });
    };
    const toggleSubtask = (taskId, subId) => {
        setTasks((prev) => prev.map((t) => {
            if (t.id !== taskId)
                return t;
            return {
                ...t,
                subtasks: t.subtasks.map((s) => (s.id === subId ? { ...s, done: !s.done } : s)),
                updated: todayISO(),
            };
        }));
        setSelected((s) => {
            if (!s || s.id !== taskId)
                return s;
            return { ...s, subtasks: s.subtasks.map((sub) => (sub.id === subId ? { ...sub, done: !sub.done } : sub)) };
        });
    };
    const updateSubtask = (taskId, subId, patch) => {
        setTasks((prev) => prev.map((t) => {
            if (t.id !== taskId)
                return t;
            return {
                ...t,
                subtasks: t.subtasks.map((s) => (s.id === subId ? { ...s, ...patch } : s)),
                updated: todayISO(),
            };
        }));
        setSelected((s) => {
            if (!s || s.id !== taskId)
                return s;
            return { ...s, subtasks: s.subtasks.map((sub) => (sub.id === subId ? { ...sub, ...patch } : sub)) };
        });
    };
    const deleteSubtask = (taskId, subId) => {
        setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, subtasks: t.subtasks.filter((s) => s.id !== subId), updated: todayISO() } : t)));
        setSelected((s) => (s && s.id === taskId ? { ...s, subtasks: s.subtasks.filter((sub) => sub.id !== subId) } : s));
    };
    const addTask = () => {
        const id = Math.max(0, ...tasks.map((t) => t.id)) + 1;
        const newTask = {
            id,
            name: "งานใหม่",
            category: "งานเรียน",
            owner: "Tarn",
            priority: "กลาง",
            important: false,
            start: todayISO(),
            deadline: todayISO(),
            status: "To Do",
            progress: 0,
            next: "",
            blocker: "",
            updated: todayISO(),
            workDate: "",
            workStart: "",
            workEnd: "",
            subtasks: [],
        };
        setTasks((prev) => [newTask, ...prev]);
        setSelected(newTask);
    };
    const filtered = useMemo(() => {
        let rows = tasks.filter((t) => {
            if (query && !t.name.toLowerCase().includes(query.toLowerCase()))
                return false;
            if (statusFilter !== "all" && t.status !== statusFilter)
                return false;
            if (catFilter !== "all" && t.category !== catFilter)
                return false;
            return true;
        });
        rows = rows.slice().sort((a, b) => {
            let av = a[sort.key];
            let bv = b[sort.key];
            if (sort.key === "deadline" || sort.key === "start") {
                av = av || "9999";
                bv = bv || "9999";
            }
            if (typeof av === "string")
                av = av.toLowerCase();
            if (typeof bv === "string")
                bv = bv.toLowerCase();
            if (av < bv)
                return sort.dir === "asc" ? -1 : 1;
            if (av > bv)
                return sort.dir === "asc" ? 1 : -1;
            return 0;
        });
        return rows;
    }, [tasks, query, statusFilter, catFilter, sort]);
    const kpis = useMemo(() => {
        const total = tasks.length;
        const done = tasks.filter((t) => t.status === "Done").length;
        const overdue = tasks.filter((t) => t.status !== "Done" && daysUntil(t.deadline) < 0).length;
        const dueSoon = tasks.filter((t) => t.status !== "Done" && daysUntil(t.deadline) >= 0 && daysUntil(t.deadline) <= 3).length;
        const pct = total ? Math.round((done / total) * 100) : 0;
        return { total, done, overdue, dueSoon, pct };
    }, [tasks]);
    if (!loaded) {
        return (React.createElement("div", { className: "flex h-screen w-full items-center justify-center bg-[#F7F7F8]", style: { fontFamily: "'Inter', system-ui, sans-serif" } },
            React.createElement("div", { className: "flex flex-col items-center gap-2 text-gray-400" },
                React.createElement(CalendarDays, { size: 22, className: "animate-pulse" }),
                React.createElement("span", { className: "text-xs" }, "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25..."))));
    }
    return (React.createElement("div", { className: "flex h-screen w-full overflow-hidden bg-[#F7F7F8] text-[#1F2430]", style: { fontFamily: "'Inter', system-ui, sans-serif" } },
        React.createElement("aside", { className: "flex w-56 shrink-0 flex-col bg-[#0B0D12] px-4 py-5 text-gray-300" },
            React.createElement("div", { className: "mb-8 flex items-center gap-2 px-1" },
                React.createElement("div", { className: "flex h-6 w-6 items-center justify-center rounded-md bg-[#4F5DFF] text-xs font-bold text-white" }, "T"),
                React.createElement("span", { className: "text-sm font-semibold text-white" }, "Task Ops")),
            React.createElement("nav", { className: "flex flex-col gap-0.5 text-sm" },
                React.createElement("button", { onClick: () => setView("tasks"), className: `flex items-center gap-2 rounded-lg px-3 py-2 text-left font-medium transition-colors ${view === "tasks" ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5"}` },
                    React.createElement(Circle, { size: 13 }),
                    " \u0E07\u0E32\u0E19\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14"),
                React.createElement("button", { onClick: () => setView("calendar"), className: `flex items-center gap-2 rounded-lg px-3 py-2 text-left font-medium transition-colors ${view === "calendar" ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5"}` },
                    React.createElement(CalendarDays, { size: 13 }),
                    " \u0E1B\u0E0F\u0E34\u0E17\u0E34\u0E19\u0E07\u0E32\u0E19"),
                React.createElement("button", { onClick: () => setView("matrix"), className: `flex items-center gap-2 rounded-lg px-3 py-2 text-left font-medium transition-colors ${view === "matrix" ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5"}` },
                    React.createElement(Grid2x2, { size: 13 }),
                    " \u0E08\u0E31\u0E14\u0E25\u0E33\u0E14\u0E31\u0E1A\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E33\u0E04\u0E31\u0E0D"),
                React.createElement("div", { className: "my-1 h-px bg-white/10" }),
                CATEGORY.map((c) => {
                    const count = tasks.filter((t) => t.category === c).length;
                    return (React.createElement("button", { key: c, onClick: () => {
                            setCatFilter((prev) => (prev === c ? "all" : c));
                            setView("tasks");
                        }, className: `flex items-center justify-between rounded-lg px-3 py-2 text-left transition-colors hover:bg-white/5 ${catFilter === c && view === "tasks" ? "bg-white/10 text-white" : "text-gray-400"}` },
                        React.createElement("span", null, c),
                        React.createElement("span", { className: "text-xs tabular-nums text-gray-500" }, count)));
                })),
            React.createElement("div", { className: "mb-2 rounded-lg bg-white/5 px-3 py-2.5" },
                React.createElement("div", { className: "mb-1.5 flex items-center justify-between" },
                    React.createElement("span", { className: "flex items-center gap-1.5 text-xs font-medium text-gray-300" },
                        React.createElement(CalendarDays, { size: 12 }),
                        " Google Calendar"),
                    googleToken && (React.createElement("span", { className: "h-1.5 w-1.5 rounded-full", style: { background: "#10B981" }, title: "\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E15\u0E48\u0E2D\u0E2D\u0E22\u0E39\u0E48" }))),
                googleToken ? (React.createElement("div", { className: "space-y-1.5" },
                    React.createElement("p", { className: "text-[11px] text-gray-500" }, gcalSyncing ? "กำลังซิงค์..." : `เชื่อมต่อแล้ว · ${googleEvents.length} events`),
                    React.createElement("div", { className: "flex gap-1.5" },
                        React.createElement("button", { onClick: () => fetchGoogleEvents(googleToken), className: "flex-1 rounded-md border border-white/10 py-1 text-[11px] text-gray-300 hover:bg-white/5" }, "\u0E0B\u0E34\u0E07\u0E04\u0E4C\u0E15\u0E2D\u0E19\u0E19\u0E35\u0E49"),
                        React.createElement("button", { onClick: disconnectGoogle, className: "flex-1 rounded-md border border-white/10 py-1 text-[11px] text-gray-400 hover:bg-white/5" }, "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E15\u0E48\u0E2D")))) : (React.createElement("button", { onClick: connectGoogle, className: "flex w-full items-center justify-center gap-1.5 rounded-md bg-white/10 py-1.5 text-[11px] font-medium text-white hover:bg-white/20" }, "\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E15\u0E48\u0E2D Google Calendar")),
                gcalError && React.createElement("p", { className: "mt-1.5 text-[10px] text-red-300" }, gcalError)),
            saveError && (React.createElement("div", { className: "mb-2 rounded-lg bg-red-500/10 px-3 py-2 text-[11px] text-red-300" }, "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08 \u2014 \u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14\u0E2D\u0E32\u0E08\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E40\u0E01\u0E47\u0E1A\u0E44\u0E27\u0E49")),
            React.createElement("div", { className: "mt-auto rounded-lg bg-white/5 px-3 py-3 text-xs text-gray-400" },
                React.createElement("div", { className: "mb-1 font-medium text-gray-300" }, "Weekly Review"),
                "\u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E17\u0E38\u0E01\u0E07\u0E32\u0E19\u0E17\u0E38\u0E01\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E44\u0E21\u0E48\u0E43\u0E2B\u0E49\u0E15\u0E01\u0E2B\u0E25\u0E48\u0E19")),
        React.createElement("div", { className: "flex flex-1 flex-col overflow-hidden" },
            React.createElement("header", { className: "flex shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6 py-4" },
                React.createElement("div", null,
                    React.createElement("h1", { className: "text-base font-semibold text-[#1F2430]" }, view === "tasks" ? "งานทั้งหมด" : view === "calendar" ? "ปฏิทินงาน" : "จัดลำดับความสำคัญ"),
                    React.createElement("p", { className: "text-xs text-gray-400" }, view === "tasks"
                        ? "ติดตามสถานะและความคืบหน้า"
                        : view === "calendar"
                            ? "ช่วงเวลาที่จองไว้สำหรับลงมือทำงาน"
                            : "แยกงานตามความสำคัญและความเร่งด่วน")),
                view === "tasks" && (React.createElement("button", { onClick: addTask, className: "flex items-center gap-1.5 rounded-lg bg-[#4F5DFF] px-3 py-2 text-xs font-medium text-white transition-transform hover:brightness-110 active:scale-95" },
                    React.createElement(Plus, { size: 14 }),
                    " \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E07\u0E32\u0E19"))),
            React.createElement("div", { className: "flex-1 overflow-y-auto px-6 py-5" }, view === "tasks" ? (React.createElement(React.Fragment, null,
                React.createElement("div", { className: "mb-5 flex gap-3" },
                    React.createElement(KpiCard, { label: "\u0E07\u0E32\u0E19\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14", value: kpis.total, icon: Circle, tint: "#6B7280" }),
                    React.createElement(KpiCard, { label: "\u0E40\u0E2A\u0E23\u0E47\u0E08\u0E41\u0E25\u0E49\u0E27", value: `${kpis.pct}%`, icon: CheckCircle2, tint: "#10B981" }),
                    React.createElement(KpiCard, { label: "\u0E43\u0E01\u0E25\u0E49 deadline", value: kpis.dueSoon, icon: Clock, tint: "#F59E0B" }),
                    React.createElement(KpiCard, { label: "\u0E40\u0E25\u0E22 deadline", value: kpis.overdue, icon: AlertTriangle, tint: "#EF4444" })),
                React.createElement("div", { className: "mb-3 flex flex-wrap items-center gap-2" },
                    React.createElement("div", { className: "flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5" },
                        React.createElement(Search, { size: 13, className: "text-gray-400" }),
                        React.createElement("input", { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "\u0E04\u0E49\u0E19\u0E2B\u0E32\u0E07\u0E32\u0E19...", className: "w-40 bg-transparent text-xs text-gray-700 placeholder-gray-400 focus:outline-none" })),
                    React.createElement("select", { value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), className: "rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-600 focus:outline-none" },
                        React.createElement("option", { value: "all" }, "\u0E17\u0E38\u0E01\u0E2A\u0E16\u0E32\u0E19\u0E30"),
                        STATUS.map((s) => (React.createElement("option", { key: s, value: s }, s)))),
                    React.createElement("select", { value: catFilter, onChange: (e) => setCatFilter(e.target.value), className: "rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-600 focus:outline-none" },
                        React.createElement("option", { value: "all" }, "\u0E17\u0E38\u0E01\u0E2B\u0E21\u0E27\u0E14\u0E2B\u0E21\u0E39\u0E48"),
                        CATEGORY.map((c) => (React.createElement("option", { key: c, value: c }, c)))),
                    (statusFilter !== "all" || catFilter !== "all" || query) && (React.createElement("button", { onClick: () => {
                            setStatusFilter("all");
                            setCatFilter("all");
                            setQuery("");
                        }, className: "text-xs text-gray-400 hover:text-gray-600" }, "\u0E25\u0E49\u0E32\u0E07\u0E15\u0E31\u0E27\u0E01\u0E23\u0E2D\u0E07")),
                    React.createElement("span", { className: "ml-auto text-xs text-gray-400" },
                        filtered.length,
                        " \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23")),
                React.createElement("div", { className: "overflow-hidden rounded-xl border border-gray-200 bg-white" },
                    React.createElement("table", { className: "w-full border-collapse" },
                        React.createElement("thead", { className: "border-b border-gray-100 bg-gray-50" },
                            React.createElement("tr", null,
                                React.createElement(Th, { sortKey: "name", sort: sort, setSort: setSort }, "\u0E0A\u0E37\u0E48\u0E2D\u0E07\u0E32\u0E19"),
                                React.createElement(Th, { sortKey: "category", sort: sort, setSort: setSort }, "\u0E2B\u0E21\u0E27\u0E14\u0E2B\u0E21\u0E39\u0E48"),
                                React.createElement(Th, { sortKey: "priority", sort: sort, setSort: setSort }, "Priority"),
                                React.createElement(Th, { sortKey: "status", sort: sort, setSort: setSort }, "\u0E2A\u0E16\u0E32\u0E19\u0E30"),
                                React.createElement(Th, { sortKey: "progress", sort: sort, setSort: setSort }, "\u0E04\u0E27\u0E32\u0E21\u0E04\u0E37\u0E1A\u0E2B\u0E19\u0E49\u0E32"),
                                React.createElement(Th, { sortKey: "deadline", sort: sort, setSort: setSort }, "Deadline"),
                                React.createElement("th", { className: "px-3 py-2.5" }))),
                        React.createElement("tbody", null,
                            filtered.map((t) => (React.createElement("tr", { key: t.id, onClick: () => setSelected(t), className: "cursor-pointer border-b border-gray-50 last:border-0 hover:bg-gray-50/80" },
                                React.createElement("td", { className: "max-w-[220px] truncate px-3 py-2.5 text-xs font-medium text-[#1F2430]" },
                                    React.createElement("span", { className: "inline-flex items-center gap-1.5" },
                                        React.createElement("span", { className: "truncate" }, t.name),
                                        t.subtasks.length > 0 && (React.createElement("span", { className: "inline-flex shrink-0 items-center gap-0.5 rounded-full bg-gray-100 px-1.5 py-0.5 text-[10px] font-normal text-gray-500", style: { fontFamily: "'JetBrains Mono', monospace" } },
                                            React.createElement(ListChecks, { size: 9 }),
                                            t.subtasks.filter((s) => s.done).length,
                                            "/",
                                            t.subtasks.length)))),
                                React.createElement("td", { className: "px-3 py-2.5 text-xs text-gray-500" }, t.category),
                                React.createElement("td", { className: "px-3 py-2.5" },
                                    React.createElement("span", { className: "inline-flex items-center gap-1 text-xs font-medium", style: { color: PRIORITY_STYLE[t.priority] } },
                                        React.createElement("span", { className: "h-1.5 w-1.5 rounded-full", style: { background: PRIORITY_STYLE[t.priority] } }),
                                        t.priority)),
                                React.createElement("td", { className: "px-3 py-2.5" },
                                    React.createElement(StatusPill, { value: t.status, onChange: (v) => updateTask(t.id, { status: v }) })),
                                React.createElement("td", { className: "px-3 py-2.5" },
                                    React.createElement(ProgressBar, { value: t.progress, onChange: (v) => updateTask(t.id, { progress: v }) })),
                                React.createElement("td", { className: "px-3 py-2.5" },
                                    React.createElement("div", { className: "flex items-center gap-1.5" },
                                        React.createElement(DeadlineBadge, { deadline: t.deadline, status: t.status }),
                                        t.workDate && (React.createElement("span", { title: formatSessionTime(t.workDate, t.workStart, t.workEnd) },
                                            React.createElement(CalendarDays, { size: 12, className: "text-[#4F5DFF]" }))))),
                                React.createElement("td", { className: "px-3 py-2.5 text-right" },
                                    React.createElement("button", { onClick: (e) => {
                                            e.stopPropagation();
                                            deleteTask(t.id);
                                        }, className: "text-gray-300 hover:text-red-500" },
                                        React.createElement(Trash2, { size: 13 })))))),
                            filtered.length === 0 && (React.createElement("tr", null,
                                React.createElement("td", { colSpan: 7, className: "px-3 py-10 text-center text-xs text-gray-400" }, "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E07\u0E32\u0E19\u0E17\u0E35\u0E48\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E15\u0E31\u0E27\u0E01\u0E23\u0E2D\u0E07")))))))) : view === "calendar" ? (React.createElement(CalendarView, { tasks: tasks, onSelectTask: (t) => setSelected(t), googleEvents: googleEvents })) : (React.createElement(MatrixView, { tasks: tasks, onSelectTask: (t) => setSelected(t), onToggleImportant: (id, val) => updateTask(id, { important: val }) })))),
        selected && (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "fixed inset-0 z-30 bg-black/20", onClick: () => setSelected(null) }),
            React.createElement("aside", { className: "fixed right-0 top-0 z-40 flex h-full w-96 flex-col border-l border-gray-200 bg-white shadow-2xl" },
                React.createElement("div", { className: "flex items-center justify-between border-b border-gray-100 px-5 py-4" },
                    React.createElement("span", { className: "text-xs font-medium text-gray-400" }, "\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E07\u0E32\u0E19"),
                    React.createElement("button", { onClick: () => setSelected(null), className: "text-gray-400 hover:text-gray-700" },
                        React.createElement(X, { size: 16 }))),
                React.createElement("div", { className: "flex-1 space-y-4 overflow-y-auto px-5 py-4" },
                    React.createElement("div", null,
                        React.createElement("label", { className: "mb-1 block text-xs text-gray-400" }, "\u0E0A\u0E37\u0E48\u0E2D\u0E07\u0E32\u0E19"),
                        React.createElement("input", { value: selected.name, onChange: (e) => {
                                updateTask(selected.id, { name: e.target.value });
                                setSelected((s) => ({ ...s, name: e.target.value }));
                            }, className: "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#4F5DFF] focus:outline-none" })),
                    React.createElement("div", { className: "grid grid-cols-2 gap-3" },
                        React.createElement("div", null,
                            React.createElement("label", { className: "mb-1 block text-xs text-gray-400" }, "\u0E2B\u0E21\u0E27\u0E14\u0E2B\u0E21\u0E39\u0E48"),
                            React.createElement("select", { value: selected.category, onChange: (e) => {
                                    updateTask(selected.id, { category: e.target.value });
                                    setSelected((s) => ({ ...s, category: e.target.value }));
                                }, className: "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none" }, CATEGORY.map((c) => (React.createElement("option", { key: c }, c))))),
                        React.createElement("div", null,
                            React.createElement("label", { className: "mb-1 block text-xs text-gray-400" }, "Priority"),
                            React.createElement("select", { value: selected.priority, onChange: (e) => {
                                    updateTask(selected.id, { priority: e.target.value });
                                    setSelected((s) => ({ ...s, priority: e.target.value }));
                                }, className: "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none" }, PRIORITY.map((p) => (React.createElement("option", { key: p }, p)))))),
                    React.createElement("button", { onClick: () => {
                            const val = !selected.important;
                            updateTask(selected.id, { important: val });
                            setSelected((s) => ({ ...s, important: val }));
                        }, className: "flex w-full items-center justify-center gap-1.5 rounded-lg border py-2 text-xs font-medium transition-colors", style: {
                            borderColor: selected.important ? "#F59E0B" : "#E5E7EB",
                            background: selected.important ? "#FFFBEB" : "white",
                            color: selected.important ? "#B45309" : "#6B7280",
                        } },
                        React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: selected.important ? "#F59E0B" : "none", stroke: selected.important ? "#F59E0B" : "#9CA3AF", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
                            React.createElement("polygon", { points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" })),
                        selected.important ? "งานสำคัญ" : "ทำเครื่องหมายว่าเป็นงานสำคัญ"),
                    React.createElement("div", { className: "grid grid-cols-2 gap-3" },
                        React.createElement("div", null,
                            React.createElement("label", { className: "mb-1 block text-xs text-gray-400" }, "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E23\u0E34\u0E48\u0E21"),
                            React.createElement("input", { type: "date", value: selected.start, onChange: (e) => {
                                    updateTask(selected.id, { start: e.target.value });
                                    setSelected((s) => ({ ...s, start: e.target.value }));
                                }, className: "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none" })),
                        React.createElement("div", null,
                            React.createElement("label", { className: "mb-1 block text-xs text-gray-400" }, "Deadline"),
                            React.createElement("input", { type: "date", value: selected.deadline, onChange: (e) => {
                                    updateTask(selected.id, { deadline: e.target.value });
                                    setSelected((s) => ({ ...s, deadline: e.target.value }));
                                }, className: "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none" }))),
                    React.createElement("div", null,
                        React.createElement("label", { className: "mb-1 block text-xs text-gray-400" }, "\u0E2A\u0E16\u0E32\u0E19\u0E30"),
                        React.createElement(StatusPill, { value: selected.status, onChange: (v) => {
                                updateTask(selected.id, { status: v });
                                setSelected((s) => ({ ...s, status: v }));
                            } })),
                    React.createElement("div", null,
                        React.createElement("label", { className: "mb-1 block text-xs text-gray-400" }, "\u0E04\u0E27\u0E32\u0E21\u0E04\u0E37\u0E1A\u0E2B\u0E19\u0E49\u0E32"),
                        React.createElement(ProgressBar, { value: selected.progress, onChange: (v) => {
                                updateTask(selected.id, { progress: v });
                                setSelected((s) => ({ ...s, progress: v }));
                            } })),
                    React.createElement("div", { className: "rounded-xl border border-gray-100 bg-gray-50/70 p-3" },
                        React.createElement("label", { className: "mb-2 flex items-center gap-1.5 text-xs font-medium text-gray-500" },
                            React.createElement(CalendarPlus, { size: 13 }),
                            " \u0E08\u0E2D\u0E07\u0E40\u0E27\u0E25\u0E32\u0E17\u0E33\u0E07\u0E32\u0E19"),
                        React.createElement("div", { className: "mb-2" },
                            React.createElement("input", { type: "date", value: selected.workDate, onChange: (e) => {
                                    updateTask(selected.id, { workDate: e.target.value });
                                    setSelected((s) => ({ ...s, workDate: e.target.value }));
                                }, className: "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-[#4F5DFF] focus:outline-none" })),
                        React.createElement("div", { className: "grid grid-cols-2 gap-2" },
                            React.createElement("div", null,
                                React.createElement("label", { className: "mb-1 block text-[10px] text-gray-400" }, "\u0E40\u0E23\u0E34\u0E48\u0E21"),
                                React.createElement("input", { type: "time", value: selected.workStart, onChange: (e) => {
                                        updateTask(selected.id, { workStart: e.target.value });
                                        setSelected((s) => ({ ...s, workStart: e.target.value }));
                                    }, className: "w-full rounded-lg border border-gray-200 bg-white px-2.5 py-2 text-sm focus:border-[#4F5DFF] focus:outline-none" })),
                            React.createElement("div", null,
                                React.createElement("label", { className: "mb-1 block text-[10px] text-gray-400" }, "\u0E16\u0E36\u0E07"),
                                React.createElement("input", { type: "time", value: selected.workEnd, onChange: (e) => {
                                        updateTask(selected.id, { workEnd: e.target.value });
                                        setSelected((s) => ({ ...s, workEnd: e.target.value }));
                                    }, className: "w-full rounded-lg border border-gray-200 bg-white px-2.5 py-2 text-sm focus:border-[#4F5DFF] focus:outline-none" }))),
                        selected.workDate && selected.workStart && selected.workEnd && (React.createElement(React.Fragment, null,
                            React.createElement("p", { className: "mt-2 text-xs text-gray-500" },
                                "\u0E08\u0E2D\u0E07\u0E44\u0E27\u0E49: ",
                                formatSessionTime(selected.workDate, selected.workStart, selected.workEnd),
                                selected.gcalEventId && (React.createElement("span", { className: "ml-1.5 inline-flex items-center gap-0.5 text-[#4F5DFF]" },
                                    React.createElement(Check, { size: 11 }),
                                    " \u0E0B\u0E34\u0E07\u0E04\u0E4C\u0E41\u0E25\u0E49\u0E27"))),
                            googleToken ? (React.createElement("button", { onClick: () => pushBookingToGoogle({
                                    taskId: selected.id,
                                    title: selected.name,
                                    description: [
                                        selected.next ? `Next action: ${selected.next}` : "",
                                        selected.blocker ? `Blocker: ${selected.blocker}` : "",
                                        `หมวดหมู่: ${selected.category} | Priority: ${selected.priority}`,
                                    ]
                                        .filter(Boolean)
                                        .join("\n"),
                                    workDate: selected.workDate,
                                    workStart: selected.workStart,
                                    workEnd: selected.workEnd,
                                    existingEventId: selected.gcalEventId,
                                }), className: "mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#4F5DFF] py-2 text-xs font-medium text-white hover:brightness-110" },
                                React.createElement(ExternalLink, { size: 13 }),
                                " ",
                                selected.gcalEventId ? "อัปเดตใน Google Calendar" : "ซิงค์กับ Google Calendar")) : buildGCalUrl(taskToGCalItem(selected)) ? (React.createElement("a", { href: buildGCalUrl(taskToGCalItem(selected)), target: "_blank", rel: "noopener noreferrer", className: "mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-gray-500 py-2 text-xs font-medium text-white hover:brightness-110" },
                                React.createElement(ExternalLink, { size: 13 }),
                                " \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E25\u0E07 Google Calendar (\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E15\u0E48\u0E2D)")) : (React.createElement("p", { className: "mt-2 text-xs text-red-400" }, "\u0E40\u0E27\u0E25\u0E32\u0E2A\u0E34\u0E49\u0E19\u0E2A\u0E38\u0E14\u0E15\u0E49\u0E2D\u0E07\u0E2B\u0E25\u0E31\u0E07\u0E40\u0E27\u0E25\u0E32\u0E40\u0E23\u0E34\u0E48\u0E21"))))),
                    React.createElement(SubtaskList, { task: selected, onAdd: (title) => addSubtask(selected.id, title), onToggle: (subId) => toggleSubtask(selected.id, subId), onDelete: (subId) => deleteSubtask(selected.id, subId), onUpdate: (subId, patch) => updateSubtask(selected.id, subId, patch), googleToken: googleToken, onPushToGoogle: (subId, booking) => pushBookingToGoogle({ taskId: selected.id, subId, ...booking }) }),
                    React.createElement("div", null,
                        React.createElement("label", { className: "mb-1 block text-xs text-gray-400" }, "Next Action"),
                        React.createElement("textarea", { value: selected.next, onChange: (e) => {
                                updateTask(selected.id, { next: e.target.value });
                                setSelected((s) => ({ ...s, next: e.target.value }));
                            }, rows: 2, className: "w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#4F5DFF] focus:outline-none" })),
                    React.createElement("div", null,
                        React.createElement("label", { className: "mb-1 block text-xs text-gray-400" }, "\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E2B\u0E15\u0E38 / Blocker"),
                        React.createElement("textarea", { value: selected.blocker, onChange: (e) => {
                                updateTask(selected.id, { blocker: e.target.value });
                                setSelected((s) => ({ ...s, blocker: e.target.value }));
                            }, rows: 2, className: "w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#4F5DFF] focus:outline-none" })),
                    React.createElement("div", { className: "pt-1 text-xs text-gray-300" },
                        "\u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14: ",
                        React.createElement("span", { style: { fontFamily: "'JetBrains Mono', monospace" } }, selected.updated))),
                React.createElement("div", { className: "border-t border-gray-100 px-5 py-3" },
                    React.createElement("button", { onClick: () => deleteTask(selected.id), className: "flex w-full items-center justify-center gap-1.5 rounded-lg border border-red-100 py-2 text-xs font-medium text-red-500 hover:bg-red-50" },
                        React.createElement(Trash2, { size: 13 }),
                        " \u0E25\u0E1A\u0E07\u0E32\u0E19\u0E19\u0E35\u0E49")))))));
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(TaskDashboard, null));
