import { Book, BookFilterEnum } from '@/../common/build';
import { useSearchBooksQuery } from '@/store/api';
import { Box } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { chunk } from 'lodash';
import Carousel from 'react-material-ui-carousel';
import { BannerContent } from './';
import Banner from './Banner';

type Props = {
  className?: string;
  autoPlay?: boolean;
  animation?: 'fade' | 'slide';
  indicators?: boolean;
  timeout?: number;
  navButtonsAlwaysVisible?: boolean;
  navButtonsAlwaysInvisible?: boolean;
  cycleNavigation?: boolean;
};

const BookSlider = ({
  className = 'BookSlider',
  autoPlay = true,
  animation = 'fade',
  indicators = true,
  timeout = 500,
  navButtonsAlwaysVisible = false,
  navButtonsAlwaysInvisible = false,
  cycleNavigation = true,
}: Props) => {
  const { data, isFetching } = useSearchBooksQuery({
    filters: { searchTerm: '', filter: BookFilterEnum.TITLE },
    pagination: { pageNumber: 1, pageSize: 20 },
  });

  const prepareItems = (): BannerContent[] => {
    const bannerItems: BannerContent[] = [];
    if (data?.items) {
      const chunks = chunk(data.items, 4);
      chunks.forEach((chk: Book[]) => {
        bannerItems.push({
          items: chk,
        });
      });
    }

    return bannerItems;
  };

  return isFetching ? (
    <CircularProgress />
  ) : data ? (
    <Box mt={12}>
      <h1>Other Books you may like</h1>

      <Carousel
        className={className}
        autoPlay={autoPlay}
        animation={animation}
        indicators={indicators}
        timeout={timeout}
        cycleNavigation={cycleNavigation}
        navButtonsAlwaysVisible={navButtonsAlwaysVisible}
        navButtonsAlwaysInvisible={navButtonsAlwaysInvisible}
        next={(now: any, previous: any) =>
          console.log(
            `Next User Callback: Now displaying child${now}. Previously displayed child${previous}`
          )
        }
        prev={(now: any, previous: any) =>
          console.log(
            `Prev User Callback: Now displaying child${now}. Previously displayed child${previous}`
          )
        }
        onChange={(now: any, previous: any) =>
          console.log(
            `OnChange User Callback: Now displaying child${now}. Previously displayed child${previous}`
          )
        }
      >
        {prepareItems().map((item, index) => {
          return <Banner key={index} item={item} spacing={1} length={4} />;
        })}
      </Carousel>
    </Box>
  ) : null;
};

export default BookSlider;
