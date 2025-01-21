import React from "react";

interface Report {
  id: number;
  title: string;
  reason: string;
  type: "Channel" | "Group" | "Private Message" | "Message";
  sender: string;
  reportedBy: string;
}

const ReportList: React.FC = () => {
  const reports: Report[] = [
    {
      id: 1,
      title: "Spam Report",
      reason: "Excessive promotional messages",
      type: "Channel",
      sender: "Tech Updates",
      reportedBy: "John Doe",
    },
    {
      id: 2,
      title: "Harassment Report",
      reason: "Abusive language in messages",
      type: "Private Message",
      sender: "Jane Smith",
      reportedBy: "Michael Brown",
    },
    {
        id: 3,
        title: "Harassment Report",
        reason: "Abusive language in messages",
        type: "Private Message",
        sender: "Jane Smith",
        reportedBy: "Michael Brown",
      },
  ];

  return (
    <div className="">
      <h2 className="text-xl font-bold mb-4">Reports</h2>
      <ul className="space-y-4">
        {reports.map((report) => (
          <li
            key={report.id}
            className="bg-gray-800 p-4 rounded-lg space-y-2 text-white"
          >
            <p className="font-bold text-lg">{report.title}</p>
            <p>
              <span className="font-medium">Reason:</span> {report.reason}
            </p>
            <p>
              <span className="font-medium">Type:</span> {report.type}
            </p>
            <p>
              <span className="font-medium">Sender:</span> {report.sender}
            </p>
            <p>
              <span className="font-medium">Reported By:</span> {report.reportedBy}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportList;
