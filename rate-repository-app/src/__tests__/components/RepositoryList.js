import React from 'react';
import { render } from '@testing-library/react-native';
import { RepositoryListContainer } from '../../components/RepositoryList';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      // Add your test code here
      const convertToKSuffix = (value) => {
        var num = Number(value);
        if (num >= 1000) {
          num = num / 1000;
          num = num.toFixed(1);
          return `${num}k`;
        }
        return value;
      };


      const { getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);

      repoNodes = repositories.edges.map(edge => edge.node)

      const allMatch = (index) => {
        expect(getAllByTestId('fullName')[index]).toHaveTextContent(repoNodes[index].fullName);
        expect(getAllByTestId('description')[index]).toHaveTextContent(repoNodes[index].description);
        expect(getAllByTestId('language')[index]).toHaveTextContent(repoNodes[index].language);

        expect(getAllByTestId('StarsValue')[index]).toHaveTextContent(convertToKSuffix(repoNodes[index].stargazersCount));
        expect(getAllByTestId('ForksValue')[index]).toHaveTextContent(convertToKSuffix(repoNodes[index].forksCount));
        expect(getAllByTestId('ReviewsValue')[index]).toHaveTextContent(convertToKSuffix(repoNodes[index].reviewCount));
        expect(getAllByTestId('RatingValue')[index]).toHaveTextContent(convertToKSuffix(repoNodes[index].ratingAverage));
      }

      for (i = 0; i < repoNodes.length; i++) {
        allMatch(i);
      }

    });
  });
});