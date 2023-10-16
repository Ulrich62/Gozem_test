import ImageDropdown from "components/ui/ImageDropdown";
import Input from "components/ui/Input";
import Pagination from "components/ui/Pagination";
import Select from "components/ui/Select";
import Table, { TableColumn } from "components/ui/Table";
import { TestimonialDto } from "dtos/testimonials.dto";
import { OrderEnum } from "enums/order.enum";
import { filterAndCountLanguages } from "helpers/filterLanguages.helper";
import { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { TestimonialsService } from "services/testimonials.service";
import { formatRelativeTime } from "utils/formatRelativeTime.utils";
import { shortenString } from "utils/shortenString.utils";
import { useDebounce } from "utils/useDebounce.utils";

const testimonialIcon = "/assets/images/a-badge.svg";
const languageIcon = "/assets/images/language-icon.svg";
const avatar = "/assets/images/avatar.svg";

const wave = "/assets/images/wave.svg";
const searchIcon = "/assets/images/search-icon.svg";

const columns: TableColumn<TestimonialDto>[] = [
  {
    Header: "Language Icon",
    accessor: "language",
    Cell: ({ row }: any) => (
      <img
        src={row.original.language.icon_url}
        style={{
          width: "24px",
          height: "24px",
        }}
        alt="Icon"
      />
    ),
  },
  {
    Header: "Avatar",
    accessor: "mentor",
    Cell: ({ row }: any) => (
      <div className="avatar">
        <img src={avatar} alt="avatar" />
      </div>
    ),
  },
  {
    Header: "Title",
    accessor: "mentor",
    Cell: ({ row }: any) => (
      <div className="mentor">
        <strong>{row.original.mentor}</strong>
        <span>{`on ${row.original.exercise.title} in ${row.original.language.title}`}</span>
      </div>
    ),
  },
  {
    Header: "Description",
    accessor: "content",
    Cell: ({ row }: any) => (
      <p className="description">{shortenString(row.original.content, 60)}</p>
    ),
  },
  {
    Header: "Date",
    accessor: "created_at",
    Cell: ({ row }: any) => (
      <p className="date">{formatRelativeTime(row.original.created_at)}</p>
    ),
  },
  {
    Header: "",
    accessor: "id",
    Cell: () => <BsChevronRight />,
  },
];

type OrderType = OrderEnum.OLDEST_FIRST | OrderEnum.NEWEST_FIRST | null;

function Testimonials() {
  const navigate = useNavigate();

  const [testimonials, setTestimonials] = useState<TestimonialDto[] | []>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const [searchValue, setSearchValue] = useState("");
  const [selectedValue, setSelectedValue] = useState<OrderType>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const testimonialsService = TestimonialsService.getInstance();

  const orderOptions = [
    { label: "Oldest First", value: OrderEnum.OLDEST_FIRST },
    { label: "Newest First", value: OrderEnum.NEWEST_FIRST },
  ];

  const debouncedValue = useDebounce(searchValue, 500);
  const filterLanguages = filterAndCountLanguages(testimonials).map(
    (language) => ({
      label: language.title,
      value: language.slug,
      iconUrl: language.icon_url,
      count: language.count,
    })
  );

  useEffect(() => {
    const getTestimonials = () => {
      setLoading(true);
      testimonialsService
        .getTestimonials({
          exercise: debouncedValue,
          page: currentPage,
          order: selectedValue || OrderEnum.OLDEST_FIRST,
        })
        .then((response) => {
          setTestimonials(response.data!);
          setCurrentPage(response.pagination?.current_page!);
          setTotalPages(response.pagination?.total_pages!);
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    getTestimonials();
  }, [debouncedValue, currentPage, selectedValue, testimonialsService]);

  const handleSelectChange = (value: any) => {
    setSelectedValue(value);
  };

  const onRowClick = (row: TestimonialDto) => {
    navigate(`/testimonials/${row.id}`);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (error) {
    return (
      <div className="title-center">
        <h1>Something went wrong</h1>
      </div>
    );
  }

  if (!loading && testimonials.length === 0) {
    return (
      <div className="title-center">
        <h1>No testimonials found</h1>
      </div>
    );
  }

  return (
    <div
      style={{
        paddingBottom: "100px",
      }}
    >
      <div className="title-section">
        <img src={testimonialIcon} alt="" />
        <div className="title">
          <h2>
            Testimonials I've left
            <span>47</span>
          </h2>
          <img src={wave} alt="" />
        </div>
      </div>
      <div className="table">
        <div className="table-header">
          <div className="search-section">
            <ImageDropdown
              options={filterLanguages}
              onChange={() => {}}
              defaultIcon={languageIcon}
            />
            <Input
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              iconSrc={searchIcon}
              placeholder="Filter by exercise title"
            />
          </div>
          <Select
            options={orderOptions}
            value={selectedValue}
            onChange={handleSelectChange}
            placeholder="Sort by Most Recent"
          />
        </div>

        <div className="table-body">
          <Table
            data={testimonials}
            columns={columns}
            loading={loading}
            handleRowClick={onRowClick}
          />
        </div>
        <div className="table-footer">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
