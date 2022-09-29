import koa, { Context } from "koa";
import { INftInfo } from "./../../../Routes/Admin";
import NftInfo from "./../../../models/NftInfo";
import { response } from "../../../constants/response";
import jwt from "jsonwebtoken";
import User from "./../../../models/User";
import { userChecker } from "../../../middlewares";
import { snstString } from "./../../../atom";
import {
  CopyObjectCommand,
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  ListObjectsCommand,
  ListObjectsCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ID!,
    secretAccessKey: process.env.AWS_SECRET!,
  },
});

export const postAdmin = async (ctx: Context) => {
  const {
    chain,
    nft,
    title,
    thumbnail,
    description,
    SNS,
    createdAt,
    hashTags,
    text,
  }: INftInfo = ctx.request.body;
  try {
    const user = ctx.user;
    if (!user.admin) {
      ctx.status = response.HTTP_BAD_REQUEST;
      return;
    }
    const upload = await NftInfo.create({
      chain,
      nft,
      title,
      thumbnail,
      description,
      SNS,
      createdAt,
      hashTags,
      text,
    });
    const bucketParams = {
      Bucket: "blueroombucket",
      Marker: `temporary/${user.username}`,
    };
    try {
      const objects = await s3.send(new ListObjectsCommand(bucketParams));
      objects.Contents?.forEach(async (content) => {
        const params = {
          Bucket: "blueroombucket",
          CopySource: `blueroombucket/${content.Key}`,
          ACL: "public-read",
          Key: `post/${title.replaceAll(" ", "")}/${content.Key?.slice(
            11 + user.username.length
          )}`,
        };
        await s3.send(new CopyObjectCommand(params));
      });
    } catch (err) {
      console.log("Error", err);
    }
    ctx.status = response.HTTP_OK;
  } catch (error) {
    console.log(error);
    ctx.status = response.HTTP_BAD_REQUEST;
    ctx.body = error;
    return;
  }
};

export const adminChecker = async (ctx: Context) => {
  try {
    const user = ctx.user;
    ctx.body = user.admin;
    ctx.status = response.HTTP_OK;
  } catch (error) {
    ctx.status = response.HTTP_BAD_REQUEST;
    ctx.body = error;
    return;
  }
};

export const uploadImage = async (ctx: Context) => {
  try {
    const file = (ctx.req as any).file;
    //const IMG_URL = `http://localhost:3000/uploads/${file.filename}`;
    const IMG_URL = file.location;
    ctx.body = IMG_URL;
    ctx.status = response.HTTP_OK;
    return;
  } catch (error) {
    console.log(error);
    ctx.status = response.HTTP_BAD_REQUEST;
  }
};

export const deleteImage = async (ctx: Context) => {
  const fileName: string = ctx.request.body.add;

  const bucketParams: DeleteObjectCommandInput = {
    Bucket: "blueroombucket",
    Key: fileName.slice(55),
  };
  const deleteObjectsCommand = new DeleteObjectCommand(bucketParams);
  s3.send(deleteObjectsCommand);
  ctx.status = response.HTTP_OK;
  return;
};

export const deletePost = async (ctx: Context) => {
  try {
    const { title }: INftInfo = ctx.request.body;
    const bucketParams = {
      Bucket: "blueroombucket",
    };
    const objects = await s3.send(new ListObjectsCommand(bucketParams));
    objects.Contents?.filter((content) =>
      content.Key?.includes(title.replaceAll(" ", ""))
    ).forEach(async (content) => {
      const deleteParams = {
        Bucket: "blueroombucket",
        Key: content.Key,
      };
      await s3.send(new DeleteObjectCommand(deleteParams));
    });

    ctx.status = response.HTTP_OK;
    const user = ctx.user;
    if (!user.admin) {
      ctx.status = response.HTTP_BAD_REQUEST;
      return;
    }
    const query = ctx.query;
    await NftInfo.deleteOne({ _id: query.nft });
    ctx.status = response.HTTP_OK;

    return;
  } catch (err) {
    console.log("Error", err);
  }
};

export const updatePost = async (ctx: Context) => {
  const {
    chain,
    nft,
    title,
    thumbnail,
    description,
    SNS,
    createdAt,
    _id,
    hashTags,
    text,
  }: INftInfo = ctx.request.body;
  const user = ctx.user;
  try {
    await NftInfo.findByIdAndUpdate(_id, {
      chain,
      nft,
      title,
      thumbnail,
      description,
      SNS,
      createdAt,
      hashTags,
      text,
    });
    const bucketParams = {
      Bucket: "blueroombucket",
      Marker: `temporary/${user.username}`,
    };
    const postParams = {
      Bucket: "blueroombucket",
      Marker: `post/${title.replaceAll(" ", "")}`,
    };
    try {
      const postObjects = await s3.send(new ListObjectsCommand(postParams));
      postObjects.Contents?.filter((data) =>
        data.Key?.includes(title.replaceAll(" ", ""))
      ).forEach(async (content) => {
        const deleteParams = {
          Bucket: "blueroombucket",
          Key: content.Key,
        };
        await s3.send(new DeleteObjectCommand(deleteParams));
      });
      const objects = await s3.send(new ListObjectsCommand(bucketParams));
      objects.Contents?.forEach(async (content) => {
        const params = {
          Bucket: "blueroombucket",
          CopySource: `blueroombucket/${content.Key}`,
          ACL: "public-read",
          Key: `post/${title.replaceAll(" ", "")}/${content.Key?.slice(
            11 + user.username.length
          )}`,
        };
        await s3.send(new CopyObjectCommand(params));
      });
    } catch (err) {
      console.log("Error", err);
    }
    ctx.status = response.HTTP_OK;
    return;
  } catch (error) {
    ctx.status = response.HTTP_BAD_REQUEST;
    ctx.body = error;
    return;
  }
};

export const deleteTemporary = async (ctx: Context) => {
  try {
    const user = ctx.user;
    const bucketParams = {
      Bucket: "blueroombucket",
      Marker: `temporary/${user.username}`,
    };
    const objects = await s3.send(new ListObjectsCommand(bucketParams));
    objects.Contents?.forEach(async (content) => {
      const deleteParams = {
        Bucket: "blueroombucket",
        Key: content.Key,
      };
      await s3.send(new DeleteObjectCommand(deleteParams));
    });
  } catch (err) {
    console.log("Error", err);
  }
  ctx.status = response.HTTP_OK;
};

export const copyTemporary = async (ctx: Context) => {
  try {
    const user = ctx.user;
    if (!user.admin) {
      ctx.status = response.HTTP_BAD_REQUEST;
      return;
    }
    const { title }: INftInfo = ctx.request.body;
    const bucketParams: ListObjectsCommandInput = {
      Bucket: "blueroombucket",
    };
    const objects = await s3.send(new ListObjectsCommand(bucketParams));
    objects.Contents?.filter((data) =>
      data.Key?.includes(title.replaceAll(" ", ""))
    ).forEach(async (content) => {
      const params = {
        Bucket: "blueroombucket",
        CopySource: `blueroombucket/${content.Key}`,
        ACL: "public-read",
        Key: `temporary/${user.username}/${content.Key?.slice(
          6 + title.replaceAll(" ", "").length
        )}`,
      };
      await s3.send(new CopyObjectCommand(params));
    });
  } catch (err) {
    console.log("Error", err);
  }
  ctx.status = response.HTTP_OK;
};
