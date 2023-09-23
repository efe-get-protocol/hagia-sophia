import { Address, BigDecimal, BigInt, Bytes } from "@graphprotocol/graph-ts";

export let ADDRESS_ZERO = Address.zero();

export let BIG_DECIMAL_ZERO = BigDecimal.fromString("0");
export let ETHER = BigInt.fromString("1_000_000_000_000_000_000");

export let BIG_INT_ZERO = BigInt.fromI32(0);
export let BIG_INT_ONE = BigInt.fromI32(1);
export let BIG_INT_NEG_ONE = BigInt.fromI32(-1);

export let BYTES_EMPTY = Bytes.empty();

// 52 weeks = 31449600
export let YEAR = BigInt.fromU32(52 * 7 * 24 * 60 * 60);
export let VESTING_DURATION = BigInt.fromU32(2 * 7 * 24 * 60 * 60);
export let ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export let ALICE = "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7";

export let ASSETS = ETHER.times(BigInt.fromI32(1000));
export let SHARES = ASSETS.div(BigInt.fromI32(104)).times(BigInt.fromI32(100));

export let PRECISION = BigInt.fromString("79228162514264337593543950335");
