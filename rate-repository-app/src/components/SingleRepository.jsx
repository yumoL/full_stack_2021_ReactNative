import React from "react";
import { useParams } from 'react-router-native';
import { View, StyleSheet, FlatList } from "react-native";
import { format, parseISO } from "date-fns";
import RepositoryItem from "./RepositoryItem";
import useSingleRepository from "../hooks/useSingleRepository";
import theme from "./Theme";
import Text from "./Text";
import Divider from "./Divider";

const RepositoryInfo = ({ repository }) => {
  return (
    <View>
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
      <Divider />
    </View>

  );
};

const ReviewItem = ({ review }) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexGrow: 1,
      marginTop: 10,
    },
    ratingBorder: {
      width: 40,
      height: 40,
      borderRadius: 40 / 2,
      borderWidth: 3,
      borderColor: theme.colors.fieldColor,
      justifyContent: 'center'
    },
    reviewDetailContainer: {
      flexDirection: 'column',
      display: 'flex',
      marginLeft: 10,
    },

  });

  return (
    <View>
      <View style={styles.container}>
        {/* rating */}
        <View style={styles.ratingBorder}>
          <Text fontWeight="bold" fontSize="subheading" style={{ color: theme.colors.fieldColor, textAlign: 'center' }}>
            {review.rating}
          </Text>
        </View>

        {/* username, creation time and text of review */}
        <View style={styles.reviewDetailContainer}>
          <Text fontWeight="bold" fontSize="subheading">{review.user.username}</Text>
          <Text color="secondary">{format(parseISO(review.createdAt), "dd-MM-yyyy")}</Text>
        </View>
      </View>
      <Text style={{ marginLeft: 50, marginBottom: 60 }}>{review.text}</Text>
    </View>

  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading } = useSingleRepository({ id: id });

  if (loading) return null;

  const reviews = repository ? repository.reviews.edges.map(edge => edge.node) : [];

  return (
    <View>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
        ItemSeparatorComponent={() => <Divider />}
        ListFooterComponent={<View style={{ height: 20 }} />}
        contentContainerStyle={{ paddingBottom: 10 }}
      />
    </View>

  );
};

export default SingleRepository;