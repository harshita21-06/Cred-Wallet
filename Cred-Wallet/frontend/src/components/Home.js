import Cards from "./Cards";

export const Home = (props) => {
  const { handleAlert } = props;
  return (
    <div>
      <Cards handleAlert={handleAlert} />
    </div>
  );
};