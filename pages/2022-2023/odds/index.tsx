import { Owner } from ".prisma/client";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import Link from "next/link";
import { prisma } from "../../../lib/prisma";

type Props = {
  owners: Owner[];
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const owners = await prisma.owner.findMany();
  return {
    props: {
      owners,
    },
  };
};

const Odds2022_2023: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ owners }) => {
  return (
    <>
      <Head>
        <title>オッズ傾斜POG | おうちPOG</title>
        <meta name="description" content="POG" />
      </Head>
      <div className="artboard p-5">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <Link href={"/"}>
                <a>TOP</a>
              </Link>
            </li>
            <li>
              <Link href={"/2022-2023"}>
                <a>2022-2023</a>
              </Link>
            </li>
            <li>
              <a>オッズ傾斜POG</a>
            </li>
          </ul>
        </div>
        <div className="flex-row flex mt-4 justify-start">
          {owners.map((owner) => (
            <label
              className="label cursor-pointer"
              key={`checkbox-${owner.name}`}
            >
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                defaultChecked={true}
              />
              <span className="label-text ml-2 text-sm">{owner.name}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export default Odds2022_2023;
