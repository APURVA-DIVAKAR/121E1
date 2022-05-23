import styles from "./CandidateCard.module.css";

function CandidateCard({avatar,name,company_name,title,salary}) {
  console.log(avatar,name,company_name,title,salary)
  return (
    <div data-testid="candidate-container" className={styles.container}>
      <img src={avatar} alt="logo" width="100px" height="100px" />
      <div>
        <div>Name:{name}</div>
        <div>Title & Company Name:{title},{company_name}</div>
      </div>
      <div>$ Salary:{salary}</div>
    </div>
  );
}

export default CandidateCard;
