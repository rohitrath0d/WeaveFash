--
-- PostgreSQL database dump
--

-- Dumped from database version 17.3
-- Dumped by pg_dump version 17.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: OrderStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."OrderStatus" AS ENUM (
    'PENDING',
    'PROCESSING',
    'SHIPPED',
    'DELIVERED'
);


ALTER TYPE public."OrderStatus" OWNER TO postgres;

--
-- Name: PaymentMethod; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."PaymentMethod" AS ENUM (
    'CREDIT_CARD'
);


ALTER TYPE public."PaymentMethod" OWNER TO postgres;

--
-- Name: PaymentStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."PaymentStatus" AS ENUM (
    'PENDING',
    'COMPLETED'
);


ALTER TYPE public."PaymentStatus" OWNER TO postgres;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'USER',
    'SUPER_ADMIN'
);


ALTER TYPE public."Role" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Address; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Address" (
    id text NOT NULL,
    "userId" text NOT NULL,
    name text NOT NULL,
    address text NOT NULL,
    city text NOT NULL,
    country text NOT NULL,
    "postalCode" text NOT NULL,
    phone text NOT NULL,
    "isDefault" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Address" OWNER TO postgres;

--
-- Name: Cart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Cart" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Cart" OWNER TO postgres;

--
-- Name: CartItem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CartItem" (
    id text NOT NULL,
    "cartId" text NOT NULL,
    "productId" text NOT NULL,
    quantity integer NOT NULL,
    size text,
    color text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."CartItem" OWNER TO postgres;

--
-- Name: ChatMessage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ChatMessage" (
    id integer NOT NULL,
    message text NOT NULL,
    "isFromBot" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "playerId" integer NOT NULL
);


ALTER TABLE public."ChatMessage" OWNER TO postgres;

--
-- Name: ChatMessage_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ChatMessage_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ChatMessage_id_seq" OWNER TO postgres;

--
-- Name: ChatMessage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ChatMessage_id_seq" OWNED BY public."ChatMessage".id;


--
-- Name: Coupon; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Coupon" (
    id text NOT NULL,
    code text NOT NULL,
    "discountPercent" double precision NOT NULL,
    "startDate" timestamp(3) without time zone NOT NULL,
    "endDate" timestamp(3) without time zone NOT NULL,
    "usageLimit" integer NOT NULL,
    "usageCount" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Coupon" OWNER TO postgres;

--
-- Name: FeatureBanner; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."FeatureBanner" (
    id text NOT NULL,
    "imageUrl" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."FeatureBanner" OWNER TO postgres;

--
-- Name: MinecraftLinks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MinecraftLinks" (
    id integer NOT NULL,
    "productId" text NOT NULL,
    token text NOT NULL,
    "isUsed" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "playerId" integer NOT NULL
);


ALTER TABLE public."MinecraftLinks" OWNER TO postgres;

--
-- Name: MinecraftLinks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."MinecraftLinks_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."MinecraftLinks_id_seq" OWNER TO postgres;

--
-- Name: MinecraftLinks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."MinecraftLinks_id_seq" OWNED BY public."MinecraftLinks".id;


--
-- Name: Order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Order" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "addressId" text NOT NULL,
    "couponId" text,
    total double precision NOT NULL,
    status public."OrderStatus" DEFAULT 'PENDING'::public."OrderStatus" NOT NULL,
    "paymentMethod" public."PaymentMethod" NOT NULL,
    "paymentStatus" public."PaymentStatus" DEFAULT 'PENDING'::public."PaymentStatus" NOT NULL,
    "paymentId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Order" OWNER TO postgres;

--
-- Name: OrderItem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."OrderItem" (
    id text NOT NULL,
    "orderId" text NOT NULL,
    "productId" text NOT NULL,
    "productName" text NOT NULL,
    "productCategory" text NOT NULL,
    quantity integer NOT NULL,
    size text,
    color text,
    price double precision NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."OrderItem" OWNER TO postgres;

--
-- Name: Player; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Player" (
    id integer NOT NULL,
    "minecraftId" text NOT NULL,
    username text NOT NULL,
    email text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "userId" text
);


ALTER TABLE public."Player" OWNER TO postgres;

--
-- Name: Player_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Player_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Player_id_seq" OWNER TO postgres;

--
-- Name: Player_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Player_id_seq" OWNED BY public."Player".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text,
    email text NOT NULL,
    password text NOT NULL,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "refreshToken" text
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    id text NOT NULL,
    name text NOT NULL,
    brand text NOT NULL,
    category text NOT NULL,
    description text NOT NULL,
    price double precision NOT NULL,
    gender text NOT NULL,
    sizes text[],
    colors text[],
    stock integer NOT NULL,
    "soldCount" integer NOT NULL,
    rating double precision,
    reviews text[],
    images text[],
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "isFeatured" boolean DEFAULT false NOT NULL
);


ALTER TABLE public.product OWNER TO postgres;

--
-- Name: ChatMessage id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ChatMessage" ALTER COLUMN id SET DEFAULT nextval('public."ChatMessage_id_seq"'::regclass);


--
-- Name: MinecraftLinks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MinecraftLinks" ALTER COLUMN id SET DEFAULT nextval('public."MinecraftLinks_id_seq"'::regclass);


--
-- Name: Player id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Player" ALTER COLUMN id SET DEFAULT nextval('public."Player_id_seq"'::regclass);


--
-- Data for Name: Address; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Address" (id, "userId", name, address, city, country, "postalCode", phone, "isDefault", "createdAt", "updatedAt") FROM stdin;
cm7v1wdcl0001q6pg2olxnoh7	cm7twujew0000q6esl3glqlij	Rohit Rathod	Mahatma Phule Nagar, Near Mankhurd Railway station	Mumbai	India	400088	09321131864	t	2025-03-04 22:18:47.829	2025-03-04 22:18:47.829
cm7vl9uoy0009q6bcd2nrcon5	cm7twujew0000q6esl3glqlij	Rohit Rathod	Mahatma Phule Nagar, Mankhurd Station, Platform no.1, Near ShivSena shaka	Mumbai	India	400043	09321131864	f	2025-03-05 07:21:09.537	2025-03-05 07:21:09.537
cm9s2zi28000dq6ukw0xeided	cm9r74i770000q65ok8qn9rt2	john doe	church street	san diego	US	92109	+1-770-212-6011	t	2025-04-22 05:45:19.664	2025-04-22 05:45:19.664
\.


--
-- Data for Name: Cart; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Cart" (id, "userId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: CartItem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CartItem" (id, "cartId", "productId", quantity, size, color, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: ChatMessage; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ChatMessage" (id, message, "isFromBot", "createdAt", "playerId") FROM stdin;
\.


--
-- Data for Name: Coupon; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Coupon" (id, code, "discountPercent", "startDate", "endDate", "usageLimit", "usageCount", "createdAt", "updatedAt") FROM stdin;
cm7qt4b2c0000q6i82yvhxyjg	UVUTHCTO	20	2025-01-02 00:00:00	2025-06-11 00:00:00	10	0	2025-03-01 23:01:56.867	2025-03-01 23:01:56.867
cm7u22f1n0000q6r0xbhvmvn9	RBESNHZV	40	2025-02-26 00:00:00	2025-03-27 00:00:00	20	0	2025-03-04 05:35:43.786	2025-03-04 05:35:43.786
cm7vl0d6o0000q6bc18y5bm3q	CPZFUBUG	20	2025-03-04 00:00:00	2025-06-11 00:00:00	5	0	2025-03-05 07:13:46.938	2025-03-05 07:13:46.938
cm9s2ciul0008q6uk5c5c4y0a	PFHFFP2U	30	2025-04-22 00:00:00	2025-04-25 00:00:00	2	0	2025-04-22 05:27:27.597	2025-04-22 05:27:27.597
cm9s3n5qn000hq6ukc128u7hx	DCTEVBJB	20	2025-04-20 00:00:00	2025-04-25 00:00:00	10	0	2025-04-22 06:03:43.355	2025-04-22 06:03:43.355
\.


--
-- Data for Name: FeatureBanner; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."FeatureBanner" (id, "imageUrl", "createdAt", "updatedAt") FROM stdin;
cm7x0hehm0001q6usnohvtxw2	https://res.cloudinary.com/dd0gfwrv6/image/upload/v1741245280/ecommerce-feature-banners/ksy19rfajtfxnydf8sbk.jpg	2025-03-06 07:14:42.202	2025-03-06 07:14:42.202
cm7x0vcdu0002q6uspo6gqswq	https://res.cloudinary.com/dd0gfwrv6/image/upload/v1741245931/ecommerce-feature-banners/abspdsury8gt7vhsithd.jpg	2025-03-06 07:25:32.571	2025-03-06 07:25:32.571
cm7x0vryk0003q6usxedmz77k	https://res.cloudinary.com/dd0gfwrv6/image/upload/v1741245951/ecommerce-feature-banners/jl44jsue16otomwwzt88.jpg	2025-03-06 07:25:52.844	2025-03-06 07:25:52.844
cm7x10bwi0004q6useg9r63pa	https://res.cloudinary.com/dd0gfwrv6/image/upload/v1741246163/ecommerce-feature-banners/txaygum2saohbqyd27pa.jpg	2025-03-06 07:29:25.314	2025-03-06 07:29:25.314
\.


--
-- Data for Name: MinecraftLinks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MinecraftLinks" (id, "productId", token, "isUsed", "createdAt", "expiresAt", "playerId") FROM stdin;
\.


--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Order" (id, "userId", "addressId", "couponId", total, status, "paymentMethod", "paymentStatus", "paymentId", "createdAt", "updatedAt") FROM stdin;
cm7v23wql0003q6pgzrjrxngh	cm7twujew0000q6esl3glqlij	cm7v1wdcl0001q6pg2olxnoh7	\N	6500	DELIVERED	CREDIT_CARD	COMPLETED	6TM65444F55397649	2025-03-04 22:24:39.548	2025-03-05 07:14:40.339
cm7vl9gbu0006q6bce3mb6d8l	cm7twujew0000q6esl3glqlij	cm7v1wdcl0001q6pg2olxnoh7	\N	1300	PENDING	CREDIT_CARD	COMPLETED	0DB92635T47653003	2025-03-05 07:20:50.921	2025-03-05 07:20:50.921
cm7x1d1ki000zq6uszcf63xms	cm7twujew0000q6esl3glqlij	cm7v1wdcl0001q6pg2olxnoh7	\N	8300	PENDING	CREDIT_CARD	COMPLETED	2FA38943W8985790J	2025-03-06 07:39:18.45	2025-03-06 07:39:18.45
cm9s33lb7000fq6uk3pk1zb3z	cm9r74i770000q65ok8qn9rt2	cm9s2zi28000dq6ukw0xeided	\N	1290	DELIVERED	CREDIT_CARD	COMPLETED	8YK530139E025303R	2025-04-22 05:48:30.499	2025-04-22 06:15:45.75
cm9s4duxb000rq6ukptkwnrur	cm9r74i770000q65ok8qn9rt2	cm9s2zi28000dq6ukw0xeided	\N	1000	DELIVERED	CREDIT_CARD	COMPLETED	56Y63449TK410980B	2025-04-22 06:24:29.136	2025-04-22 06:25:18.403
\.


--
-- Data for Name: OrderItem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."OrderItem" (id, "orderId", "productId", "productName", "productCategory", quantity, size, color, price, "createdAt", "updatedAt") FROM stdin;
cm7v23wql0004q6pg7ui7ywki	cm7v23wql0003q6pgzrjrxngh	cm7t4pdqx0005q6yoycoyvned	unplash6	fashion	5	M	Navy	1300	2025-03-04 22:24:39.548	2025-03-04 22:24:39.548
cm7vl9gbu0007q6bc0t4m0ro4	cm7vl9gbu0006q6bce3mb6d8l	cm7t4pdqx0005q6yoycoyvned	unplash6	fashion	1	L	Black	1300	2025-03-05 07:20:50.921	2025-03-05 07:20:50.921
cm7x1d1ki0010q6usx4niyjp0	cm7x1d1ki000zq6uszcf63xms	cm7t4pdqx0005q6yoycoyvned	unplash6	fashion	2	L	Black	1300	2025-03-06 07:39:18.45	2025-03-06 07:39:18.45
cm7x1d1ki0011q6us3vak3qq0	cm7x1d1ki000zq6uszcf63xms	cm7t4n6bx0004q6yo0hwdzrqt	unplash2	fashion	1	L	Orange	1800	2025-03-06 07:39:18.45	2025-03-06 07:39:18.45
cm7x1d1ki0012q6ussa24phxb	cm7x1d1ki000zq6uszcf63xms	cm7t4pdqx0005q6yoycoyvned	unplash6	fashion	3	L	Navy	1300	2025-03-06 07:39:18.45	2025-03-06 07:39:18.45
cm9s33lb7000gq6uk84pnlfv9	cm9s33lb7000fq6uk3pk1zb3z	cm7x054u90000q6us866j437d	joggers	sun glass	1	S	Yellow	1290	2025-04-22 05:48:30.499	2025-04-22 05:48:30.499
cm9s4duxc000sq6uk4czpvv2o	cm9s4duxb000rq6ukptkwnrur	cm7t4aloo0000q6yoeg6j7ggm	unplash1	fashion	2	L	Orange	500	2025-04-22 06:24:29.136	2025-04-22 06:24:29.136
\.


--
-- Data for Name: Player; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Player" (id, "minecraftId", username, email, "createdAt", "updatedAt", "userId") FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, name, email, password, role, "createdAt", "updatedAt", "refreshToken") FROM stdin;
cm7twujew0000q6esl3glqlij	rohit rathod	rohitrathod@gmail.com	$2a$12$Dgpx6Q2rwSuHR4NTpQTTjeMkBk7NJuqTu7p1j4kRW82Q.HtVI.PVu	USER	2025-03-04 03:09:38.118	2025-03-04 03:09:38.118	\N
cm7tzhh0d0000q6d8ghj6jfos	Super Admin	admin@gmail.com	$2a$10$otjGlGF06bVzNTSVoG44m.7aDlLLQj2Pg/519HPCebRjyJt5Mb4Cy	SUPER_ADMIN	2025-03-04 04:23:27.323	2025-03-04 04:23:27.323	\N
cm9n97k8w0000q6kkmxvl03w8	Aman jaiswal	jaman0120@gmail.com	$2a$12$19.TBx6QlFYIwdJolcagk.jgCUwa23W3hGNoI4tRnE4NfmHv5aUW6	USER	2025-04-18 20:40:42.557	2025-04-18 20:40:42.557	\N
cm9r74i770000q65ok8qn9rt2	virat kohli	viratkohli@gmail.com	$2a$12$nwNAkE9wUfakBaHky4W7WOpMyT93fy8/g.nqWiYShlj1GwucUANSi	USER	2025-04-21 14:53:25.41	2025-04-21 14:53:25.41	\N
cmcn5a9830000q628bv9sn7tl	Rohit Rathod	batman@gotham.com	$2a$12$GJgEsEfOSxUa.C/sm10Cbui400bCUN2KCG/2xrUrHFZzgaZC7ZQwy	USER	2025-07-03 08:49:56.787	2025-07-03 08:49:56.787	\N
cmcn93fhm0001q628x92849bi	aman	batman@gmail.com	$2a$12$kRicD/TE1ka6xK/VY5OZC.onzUvXqNLA9zkXJwF35n9WXPkUdBxX2	USER	2025-07-03 10:36:36.778	2025-07-03 10:36:36.778	\N
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
dd5fc10b-da08-40e4-a4c2-bd9d0b7f6582	ee8659b3074e85024bdcddf85103b6749083f4b43759d7bda3d8ab2b49e33fcd	2025-02-18 20:33:30.532689+05:30	20250218150330_user	\N	\N	2025-02-18 20:33:30.517274+05:30	1
9f87a31d-c864-4201-9ce3-82f6a2414a22	65e017cc3ec62e71445bf85188fc13ee6ab4ebe447eb934b66c5f0a8b06a61c7	2025-02-25 20:35:27.151558+05:30	20250225150527_product	\N	\N	2025-02-25 20:35:27.112833+05:30	1
daf5b63f-a9ba-4b3b-9178-3f722a7c3529	15b25bc134e128a9f5360b7a05db3356786d1d52e86fa6815e4942ea9968e03d	2025-03-04 04:50:32.609099+05:30	20250303232032_cart_address_order_payment	\N	\N	2025-03-04 04:50:32.567572+05:30	1
59acb871-70eb-41cd-9fdd-fded1a9e3cfe	c495f893be10e8ce8b02ca567f6addb6fe72cd4763dbb24dceba5d7fcafe6855	2025-04-21 21:14:35.749797+05:30	20250421154435_add_minecraft_models	\N	\N	2025-04-21 21:14:35.714302+05:30	1
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product (id, name, brand, category, description, price, gender, sizes, colors, stock, "soldCount", rating, reviews, images, "createdAt", "updatedAt", "isFeatured") FROM stdin;
cm7t4aloo0000q6yoeg6j7ggm	unplash1	luis vuitton	fashion	brown court	500	women	{S,L,XL,M}	{Navy,Orange}	32	2	0	\N	{https://res.cloudinary.com/dd0gfwrv6/image/upload/v1741009818/ecommerce/yacegfdunsttlqxnrt6h.jpg}	2025-03-03 13:50:18.655	2025-04-22 06:24:29.151	t
cm7t4eh170002q6yo3kznfqi7	unplash3	dolche gabana	hand bags	black handbag	1000	women	{M}	{Black,Navy}	30	0	0	\N	{https://res.cloudinary.com/dd0gfwrv6/image/upload/v1741009998/ecommerce/xzpbgbxsnesonqnrqtof.jpg}	2025-03-03 13:53:19.291	2025-03-06 07:29:25.354	t
cm7t4hjl00003q6yo5ompvqr1	unplash4	reebok	sun glass	black shades	1200		{""}	{Black}	50	0	0	\N	{https://res.cloudinary.com/dd0gfwrv6/image/upload/v1741010141/ecommerce/f3o1hsojeuq6iw7kka7e.jpg}	2025-03-03 13:55:42.523	2025-03-06 07:29:25.354	t
cm7t4c5oc0001q6yoc24iy71n	unplash5	reebok	fashion	black dress	400	women	{S,M,L,XL}	{Black}	15	0	\N	\N	{https://res.cloudinary.com/dd0gfwrv6/image/upload/v1741009890/ecommerce/w6djd2yahicvumqr2wwa.jpg}	2025-03-03 13:51:31.26	2025-03-06 07:29:25.354	t
cm7t4n6bx0004q6yo0hwdzrqt	unplash2	luis vuitton	fashion	orange coat	1800	women	{S,M,L,XL}	{Orange,Cyan}	59	1	0	\N	{https://res.cloudinary.com/dd0gfwrv6/image/upload/v1741010404/ecommerce/wzvcg4tvw2zv9liq5m1z.jpg}	2025-03-03 14:00:05.326	2025-03-06 07:39:18.471	t
cm7t4pdqx0005q6yoycoyvned	unplash6	nike	fashion	jacket and t-shirt	1300	men	{M,L,XL,2XL}	{Black,Navy}	189	11	0	\N	{https://res.cloudinary.com/dd0gfwrv6/image/upload/v1741010507/ecommerce/w0vjmosxgagayawctpx6.jpg}	2025-03-03 14:01:48.209	2025-03-06 07:39:18.472	t
cm7x054u90000q6us866j437d	joggers	nike	sun glass	woman with handbag ang shades	1290	women	{S,M}	{Yellow,Navy}	22	1	0	\N	{https://res.cloudinary.com/dd0gfwrv6/image/upload/v1741244708/ecommerce/iu125kc56x6kmrguvkzn.jpg}	2025-03-06 07:05:09.823	2025-04-22 05:48:30.52	t
cm7t4wc0h0000q6fkknq0kxfr	unplash8	adidas	fashion		3000	women	{""}	{Black,Navy,White}	18	0	0	\N	{https://res.cloudinary.com/dd0gfwrv6/image/upload/v1741010832/ecommerce/qsimsl4pii9m9xtzfehy.jpg}	2025-03-03 14:07:12.594	2025-03-06 07:29:25.354	t
cm7x11lc50005q6uste2x6r1k	hike	dolche gabana	fashion	dssja	1233	women	{M,L,XL}	{Green,Navy,Black,Yellow}	20	0	0	\N	{https://res.cloudinary.com/dd0gfwrv6/image/upload/v1741246223/ecommerce/h4lypdu6woy9dq7ykqtz.jpg}	2025-03-06 07:30:24.196	2025-03-06 07:30:24.196	f
\.


--
-- Name: ChatMessage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ChatMessage_id_seq"', 1, false);


--
-- Name: MinecraftLinks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."MinecraftLinks_id_seq"', 1, false);


--
-- Name: Player_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Player_id_seq"', 1, false);


--
-- Name: Address Address_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_pkey" PRIMARY KEY (id);


--
-- Name: CartItem CartItem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CartItem"
    ADD CONSTRAINT "CartItem_pkey" PRIMARY KEY (id);


--
-- Name: Cart Cart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT "Cart_pkey" PRIMARY KEY (id);


--
-- Name: ChatMessage ChatMessage_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ChatMessage"
    ADD CONSTRAINT "ChatMessage_pkey" PRIMARY KEY (id);


--
-- Name: Coupon Coupon_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Coupon"
    ADD CONSTRAINT "Coupon_pkey" PRIMARY KEY (id);


--
-- Name: FeatureBanner FeatureBanner_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FeatureBanner"
    ADD CONSTRAINT "FeatureBanner_pkey" PRIMARY KEY (id);


--
-- Name: MinecraftLinks MinecraftLinks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MinecraftLinks"
    ADD CONSTRAINT "MinecraftLinks_pkey" PRIMARY KEY (id);


--
-- Name: OrderItem OrderItem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_pkey" PRIMARY KEY (id);


--
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);


--
-- Name: Player Player_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Player"
    ADD CONSTRAINT "Player_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- Name: Address_userId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Address_userId_idx" ON public."Address" USING btree ("userId");


--
-- Name: CartItem_cartId_productId_size_color_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "CartItem_cartId_productId_size_color_key" ON public."CartItem" USING btree ("cartId", "productId", size, color);


--
-- Name: Cart_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Cart_userId_key" ON public."Cart" USING btree ("userId");


--
-- Name: Coupon_code_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Coupon_code_key" ON public."Coupon" USING btree (code);


--
-- Name: MinecraftLinks_token_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "MinecraftLinks_token_key" ON public."MinecraftLinks" USING btree (token);


--
-- Name: OrderItem_orderId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "OrderItem_orderId_idx" ON public."OrderItem" USING btree ("orderId");


--
-- Name: OrderItem_productId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "OrderItem_productId_idx" ON public."OrderItem" USING btree ("productId");


--
-- Name: Order_addressId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Order_addressId_idx" ON public."Order" USING btree ("addressId");


--
-- Name: Order_couponId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Order_couponId_idx" ON public."Order" USING btree ("couponId");


--
-- Name: Order_userId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Order_userId_idx" ON public."Order" USING btree ("userId");


--
-- Name: Player_minecraftId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Player_minecraftId_key" ON public."Player" USING btree ("minecraftId");


--
-- Name: Player_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Player_userId_key" ON public."Player" USING btree ("userId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_refreshToken_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_refreshToken_key" ON public."User" USING btree ("refreshToken");


--
-- Name: Address Address_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: CartItem CartItem_cartId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CartItem"
    ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES public."Cart"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Cart Cart_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ChatMessage ChatMessage_playerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ChatMessage"
    ADD CONSTRAINT "ChatMessage_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES public."Player"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: MinecraftLinks MinecraftLinks_playerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MinecraftLinks"
    ADD CONSTRAINT "MinecraftLinks_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES public."Player"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: OrderItem OrderItem_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Order Order_addressId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES public."Address"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Order Order_couponId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES public."Coupon"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Order Order_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Player Player_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Player"
    ADD CONSTRAINT "Player_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

