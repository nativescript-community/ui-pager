
declare class NSCProgressHelper extends NSObject {

	static alloc(): NSCProgressHelper; // inherited from NSObject

	static new(): NSCProgressHelper; // inherited from NSObject

	static setProgressWithPageControlProgressAnimated(pageControl: CHIBasePageControl, progress: number, animated: boolean): void;
}
