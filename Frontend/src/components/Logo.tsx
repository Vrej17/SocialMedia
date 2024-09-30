type IlogoProps = {
  onClick: () => void;
  className: string;
};
export default function Logo({ onClick, className }: IlogoProps) {
  return (
    <button className={className} onClick={onClick}>
      Social Media
    </button>
  );
}
