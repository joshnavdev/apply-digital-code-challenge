export interface ConfigContentful {
  baseUrl: string;
}

export default (): { contentful: ConfigContentful } => {
  const space = process.env.CONTENTFUL_SPACE;
  const environment = process.env.CONTENTFUL_ENVIRONMENT;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN!;
  const host = process.env.CONTENTFUL_BASE_URL!;

  return {
    contentful: {
      baseUrl: `${host}/spaces/${space}/environments/${environment}/entries?access_token=${accessToken}`,
    },
  };
};
