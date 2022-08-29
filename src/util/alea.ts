interface RNG {
  (): number;
  next: RNG;
}

function Mash() {
  let n = 0xefc8249d;

  const mash = function (data: number) {
    const str = data.toString();
    for (let i = 0; i < str.length; i++) {
      n += str.charCodeAt(i);
      let h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  mash.version = 'Mash 0.9';
  return mash;
}

/**
 * Factory for a random number generator
 * @author Johannes Baagøe <baagoe@baagoe.com>, 2010
 * @param args 
 * @returns 
 */
export default function Alea(...args: number[]): RNG {
  
  let s0 = 0;
  let s1 = 0;
  let s2 = 0;
  let c = 1;

  if (args.length == 0) {
    args = [Date.now()];
  }

  let mash = Mash();
  s0 = mash(0);
  s1 = mash(0);
  s2 = mash(0);

  for (let i = 0; i < args.length; i++) {
    s0 -= mash(args[i]);
    if (s0 < 0) {
      s0 += 1;
    }
    s1 -= mash(args[i]);
    if (s1 < 0) {
      s1 += 1;
    }
    s2 -= mash(args[i]);
    if (s2 < 0) {
      s2 += 1;
    }
  }
  mash = null;

  const random: RNG = function () {
    const t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32
    s0 = s1;
    s1 = s2;
    return s2 = t - (c = t | 0);
  };
  random.next = random;

  return random;
}