import { Construct } from 'constructs';
import {
  aws_s3 as s3,
  aws_cloudfront as cloudfront,
  aws_cloudfront_origins as origins,
  aws_s3_deployment as s3deploy,
  RemovalPolicy,
  CfnOutput,
} from 'aws-cdk-lib';

const path = '../dist/app/browser';

export class DeploymentService extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // S3 bucket for hosting the website
    const hostingBucket = new s3.Bucket(this, 'cap-shopaholics-bucket', {
      autoDeleteObjects: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    // CloudFront distribution for the S3 bucket
    const distribution = new cloudfront.Distribution(
      this,
      'cap-shopaholics-distribution',
      {
        defaultBehavior: {
          origin: origins.S3BucketOrigin.withOriginAccessControl(hostingBucket),
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        defaultRootObject: 'index.html',
        errorResponses: [
          {
            httpStatus: 404,
            responseHttpStatus: 200,
            responsePagePath: '/index.html',
          },
        ],
      },
    );

    // Deployment of the website to the S3 bucket
    new s3deploy.BucketDeployment(this, 'BucketDeployment', {
      sources: [s3deploy.Source.asset(path)],
      destinationBucket: hostingBucket,
      distribution,
      distributionPaths: ['/*'],
    });

    // Outputs for easy access to the CloudFront URL and S3 bucket name
    new CfnOutput(this, 'CloudFrontURL', {
      value: distribution.distributionDomainName,
      description: 'The distribution URL',
      exportName: 'CloudfrontURL',
    });

    new CfnOutput(this, 'BucketName', {
      value: hostingBucket.bucketName,
      description: 'The name of the S3 bucket',
      exportName: 'BucketName',
    });
  }
}
