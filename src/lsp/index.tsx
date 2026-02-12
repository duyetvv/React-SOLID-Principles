import OrchestratorPayment from "./payment/Orchestrator";
// import OrchestratorUpload from "./upload-storage/orchestrator";

const LiskovSubstitutionPrinciple = () => {
  return (
    <div>
      <h1>Liskov Substitution Principle</h1>
      <OrchestratorPayment />
      {/* <OrchestratorUpload /> */}
    </div>
  );
};

export default LiskovSubstitutionPrinciple;
