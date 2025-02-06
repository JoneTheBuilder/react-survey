import AnswersItem from "./AnswersItem";

export default function AnswersList({ answersList, onEdit }) {
  console.log("Inside AnswersList: ", answersList);

  return (
    <ul>
      {answersList.map((answerItem, i) => (
        <AnswersItem 
          answerItem={answerItem} 
          onEdit={onEdit}
          index={i}
          key={i} 
        />
      ))}
    </ul>
  );
}
