import Link from "next/link"
import { SearchListItem, SearchListTitle } from "./Search.style"
import Image from "next/image"
import { IoIosArrowForward } from "react-icons/io"


const SearchResultMovie = (props) => {
    const { movieList } = props
    return <>
        <SearchListTitle>
            Movie {movieList?.total_results}<IoIosArrowForward size={35} /></SearchListTitle>
        {movieList?.search?.map((list) => (
            <SearchListItem key={list.id}>
                <div>
                    <Link href={`/movie/${list.id}`}>
                        <Image src={list.poster_path ? `https://image.tmdb.org/t/p/w780${list.poster_path}` : '/blank.png'} alt={list?.title}
                            width={46}
                            height={62}
                            objectFit='contain'
                        />
                    </Link>
                    <div>
                        <Link href={`/movie/${list.id}`}>
                            <div>{list.title}</div>
                        </Link>
                        <div>{list.genre[0]} &#183; {list.release_date}</div>
                    </div>
                </div>
            </SearchListItem>
        ))}</>
}

export default SearchResultMovie