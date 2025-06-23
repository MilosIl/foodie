const List = ({ label, listItems }) => {
  return (
    <div className="bg-orange-100 my-1 p-2 rounded-lg">
      <p className="font-semibold text-lg">{label}:</p>
      <ul>
        {listItems.map((item, index) => (
          <li key={index} className="hover:underline">
            - {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export { List };
