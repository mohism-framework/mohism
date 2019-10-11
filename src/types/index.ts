export type MohismConf = {
  name?: string;
  type?: string;
  children: Array<{
    appId: number,
    name: string
  }>;
}

