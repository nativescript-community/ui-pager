import Foundation
import CHIPageControl

@objcMembers
@objc(NSCProgressHelper)
public class NSCProgressHelper: NSObject {

    public static func setProgress( pageControl: CHIBasePageControl,progress: Int, animated: Bool) {

        pageControl.set(progress: progress, animated: animated);
        
  }
}
