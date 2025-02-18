import { Course, Subject } from "~/types";
import useRedis from "~/lib/redis";

export const getCourses = async (): Promise<Course[]> => {
  const redis = useRedis();
  const classIds = await redis.lrange("class.list", 0, -1);
  if (classIds.length === 0) return [];
  const classDetails = await redis.mget(...classIds.map((id) => `class:${id}`));
  return classIds.map((id, idx) => ({ id, ...JSON.parse(classDetails[idx]!) }));
};

export const getSubjects = async (): Promise<Subject[]> => {
  const redis = useRedis();
  const subjectIds = await redis.lrange("subject.list", 0, -1);
  if (subjectIds.length === 0) return [];
  const subjectDetails = await redis.mget(
    ...subjectIds.map((id) => `subject:${id}`),
  );
  return subjectIds.map((id, idx) => ({ id, name: subjectDetails[idx]! }));
};
