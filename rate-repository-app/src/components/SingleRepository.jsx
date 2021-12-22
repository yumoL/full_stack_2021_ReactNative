import React from "react";
import { useParams } from 'react-router-native';
import RepositoryItem from "./RepositoryItem";
import useSingleRepository from "../hooks/useSingleRepository";

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading} = useSingleRepository({id: id});

  if (loading) return null;

  return (
    <RepositoryItem
      fullName={repository.fullName}
      description={repository.description}
      language={repository.language}
      stargazersCount={repository.stargazersCount}
      forksCount={repository.forksCount}
      reviewCount={repository.reviewCount}
      ratingAverage={repository.ratingAverage}
      ownerAvatarUrl={repository.ownerAvatarUrl}
      url={repository.url}
    />
  );
};

export default SingleRepository;