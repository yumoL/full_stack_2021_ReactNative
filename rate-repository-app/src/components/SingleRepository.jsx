import React from "react";
import { useParams } from 'react-router-native';
import { View, StyleSheet, FlatList, Button, Alert } from 'react-native';
import { format, parseISO } from "date-fns";
import { useHistory } from 'react-router-dom';
import RepositoryItem from "./RepositoryItem";
import useSingleRepository from "../hooks/useSingleRepository";
import theme from "./Theme";
import Text from "./Text";
import Divider from "./Divider";
import useDeleteReview from "../hooks/useDeleteReview";
import useAuthUser from "../hooks/useAuthUser";

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

export const ReviewItem = ({ review, isMyReview = false }) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexGrow: 1,
      marginTop: 10,
      marginBottom: 20
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
    buttonContainer: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-evenly',
      marginBottom: 30
    }

  });

  const history = useHistory();
  const redirectToRepo = (id) => {
    history.push(`/repo/${id}`);
  };

  const { deleteReview } = useDeleteReview();
  const { refetch } = useAuthUser({includeReviews: true, first: 3});

  const handleDeleteReview = async (id) => {
    await deleteReview({ id });
    refetch();
  };

  const deleteAlertView = (id) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          onPress: () => false,
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: () => handleDeleteReview(id)
        }
      ]
    );
  };


  return (
    <View>
      <View style={styles.container}>
        {/* rating */}
        <View style={styles.ratingBorder}>
          <Text fontWeight="bold" fontSize="subheading" style={{ color: theme.colors.fieldColor, textAlign: 'center' }}>
            {review.rating}
          </Text>
        </View>

        {/* usernam or repo name if isMyReview, creation time and text of review */}
        <View style={styles.reviewDetailContainer}>
          <Text fontWeight="bold" fontSize="subheading">{isMyReview ? review.repository.fullName : review.user.username}</Text>
          <Text color="secondary">{format(parseISO(review.createdAt), "dd-MM-yyyy")}</Text>
        </View>
      </View>
      <Text style={{ marginLeft: 50, marginBottom: 10 }}>{review.text}</Text>
      {isMyReview == false ? null :
        <View style={styles.buttonContainer}>
          <Button title="View repository" style={{ marginRight: 10 }} onPress={() => redirectToRepo(review.repository.id)} />
          <Button title="Delete review" color="red" onPress={() => deleteAlertView(review.id)} />
        </View>}
    </View>

  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading, fetchMore } = useSingleRepository({ id: id, first: 3 });

  if (loading) return null;

  const reviews = repository ? repository.reviews.edges.map(edge => edge.node) : [];

  const onEndReached = () => {
    fetchMore();
  };

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
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
    </View>

  );
};

export default SingleRepository;