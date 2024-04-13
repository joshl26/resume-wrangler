import styles from "./Page.module.css";

type Props = {
  children: any | never;
};

const Page = ({ children }: any) => (
  <div className={styles.page}>{children}</div>
);

export default Page;