interface Props {
  goBack: () => void;
}

const Privacy = ({ goBack }: Props) => {
  return (
    <div className=" bg-base-300 text-white flex justify-center">
      <div className="w-full bg-base-300  shadow-lg p-4">
        <div className="flex">
          <button onClick={() => goBack()}>Back</button>
          <h2 className="text-2xl font-bold ms-4">Privacy and Security</h2>
        </div>
        <div className="space-y-4 mt-4">
          {/* Blocked Users */}
          <div className="flex justify-between items-center">
            <span>Blocked Users</span>
            <button className="btn btn-warning btn-sm">Manage (196)</button>
          </div>

          {/* Two-Step Verification */}
          <div className="flex justify-between items-center mt-4">
            <span>Two-Step Verification</span>
            <button className="btn btn-success btn-sm">View</button>
          </div>

          {/* Active Sessions */}
          <div className="flex justify-between items-center mt-4">
            <span>Active Sessions</span>
            <button className="btn btn-info btn-sm">View (3)</button>
          </div>

          <hr className="my-4 border-gray-700" />
        </div>
        <p className=" text-sm text-base-300">
          Updated 10.4 September 29, 2024 Improved structure
        </p>
      </div>
    </div>
  );
};

export default Privacy;
