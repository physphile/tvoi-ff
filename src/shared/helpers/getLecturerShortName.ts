interface Args {
  first_name?: string;
  middle_name?: string;
  last_name?: string;
}

export const getLecturerShortName = ({
  first_name,
  middle_name,
  last_name,
}: Args) => {
  return `${last_name} ${first_name?.[0]}. ${middle_name?.[0]}.`;
};
